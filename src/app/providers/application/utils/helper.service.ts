import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import * as _moment from 'moment';
import { DynamicDialogComponent } from 'src/app/core/components/dynamic-dialog/dynamic-dialog.component';
import { MatDialog } from '@angular/material';
import { API } from '../../webservice/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListDiscussionComponent } from 'src/app/modals/discussion/list-discussion/list-discussion.component';

@Injectable({
  providedIn: 'root'
})
export class Helper {

  constructor(@Inject(DOCUMENT) private doc, @Inject(PLATFORM_ID) private platform_id,
    private dialog: MatDialog, private api: API, private spinner: NgxSpinnerService, private sanitizer: DomSanitizer) { }

  isBrowser() {
    return isPlatformBrowser(this.platform_id);
  }


  stripURL(url) {
    return '/' + url.split('/').slice(3).join('/');
  }

  // Code for Submitting the form and check for erros.
  onSubmit(value: any, submitVal: any, status: any) {
    event.preventDefault();
    event.stopPropagation();
    if (value.valid) {
      return value.value;
    }
    else if (status === 'casecreate') {
      return (value.value.subject == null || value.value.subject == "") ? this.validateAllFormFields(value, submitVal, 'subject') : value.value;
    }
    // Handle special scenario only for one fields called "lead_owner"
    else if (status === 'initiativecreate') {
      return (value.value.lead_owner == null || value.value.lead_owner == "") ? this.validateAllFormFields(value, submitVal, 'lead_owner') : value.value;
    } else {
      return (submitVal == 'no' || status == 'reject' || status == 'return' || status == 'returnCxops' || status == 'returnInitiator') ? value.value : this.validateAllFormFields(value, submitVal, '');
    }
  }
  // Code for validating all the fields.
  validateAllFormFields(formGroup: FormGroup, submitValue: string, fieldval: string) {
    // Handle special scenario only for one fields called "lead_owner"
    if (submitValue == 'no') {
      const control2 = formGroup.get(fieldval);
      control2.markAsTouched({ onlySelf: true });
    } else {
      Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      console.log('mandatory error')
      this.dialog.open(DynamicDialogComponent, {
        width: '350px',
        data: {
          title: 'REQUIRED', message: 'Please fill all the mandatory fields before submitting.',
          btnNegativeLabel: 'OK'
        }
      });
    }
  }

  // Format date on dynamic fields
  formatDateIterator(formdata) {
    for (let key in formdata) {
      if (key.indexOf('date') > -1 && formdata[key] != undefined) {
        formdata[key] = _moment(formdata[key]).format('DD-MMM-YYYY');
      }
    }
    formdata.raised_by = formdata.initiator;
    formdata.case_create_date = _moment(new Date()).format('DD-MMM-YYYY');
    return formdata;
  }
  //download from UI
  download(id: any) {
    this.spinner.show();
    this.api.downloadfile(id).subscribe(res => {
      this.attchdownload(res);
      this.spinner.hide();
    }, err => {
      this.dialog.open(DynamicDialogComponent, {
        width: '300px',
        data: { title: 'FAILED', message: 'Something went wrong, Not able to download the file properly.', btnNegativeLabel: 'OK' }
      });
      this.spinner.hide();
    })
  }
  downloadMeetingAttach(id: any) {
    this.spinner.show();
    this.api.downloadMeetingAttach(id).subscribe(res => {
      this.attchdownload(res);
      this.spinner.hide();
    }, err => {
      this.dialog.open(DynamicDialogComponent, {
        width: '300px',
        data: { title: 'FAILED', message: 'Something went wrong, Not able to download the file properly.', btnNegativeLabel: 'OK' }
      });
      this.spinner.hide();
    })
  }
  attchdownload(text) {
    var element = document.createElement('a');
    element.setAttribute('href', atob(text));
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  // Helper function to Format date
  formatDate(_date) {
    return (_date == null || _date == '') ? '' : _moment(_date).format('DD-MMM-YYYY');
  }
  formatDateTime(_date) {
    return (_date == null || _date == '') ? '' : _moment(_date).format('DD-MMM-YYYY HH:mm A');
  }
  tzFormatDate(_date, format = '') {
    format = (format && format !== '') ? format : 'DD-MMM-YYYY';
    // return _moment(_date).utc(false).format(format);
    // return (_date == null || _date == '') ? '' :
    //   ((new Date().getTimezoneOffset() > 0) ? _moment(_date).add(1, 'd').format(format) : _moment(_date).format(format));
    return (_date) ? _moment(_date.split('T')[0]).format(format) : '';
  }
  inputformat(_date) {
    return (_date == null || _date == '') ? '' :
      ((new Date().getTimezoneOffset() > 0) ? _moment(_date).add(1, 'd').toISOString() : _moment(_date).toISOString());
  }
  getDaysDiff(_date) {
    const currentDate = _moment(new Date());
    const createdDate = _moment(_date);
    // console.log(currentDate.diff(createdDate, 'days'),'Days');
    return (_date == null || _date == '') ? '' : Math.abs(currentDate.diff(createdDate, 'days'));
  }
  returnValueforView(attribute, data) {
    if (attribute.indexOf('DROPDOWN-SINGLE') > -1) {
      return (data == undefined || data.indexOf('- SELECT -') !== -1) ? '' : data.split(':')[1];
    }
    if (attribute.indexOf('DROPDOWN-MULTI') > -1) {
      return (data == undefined || data.indexOf('- SELECT -') !== -1) ? '' : data.split('|').map(_i => _i.split(':')[1]).join(',');
    }
    if (attribute.indexOf('CHECKBOX') > -1 || attribute.indexOf('RADIOBUTTON') > -1) {
      return (data && (data == 'Y' || data.toLowerCase() == 'yes')) ? 'Yes' : (data && (data == 'N' || data.toLowerCase() == 'no')) ? 'No' : '';
    }

    return data;
  }
  gotoView() {
    let elmnt = this.doc.getElementById("attach_file");
    elmnt.scrollIntoView();
  }
  removeUnderscore(value) {
    return value.replace(/_/g, ' ');
  }




  removeColon(value, data) {
    value = (!value || value === undefined) ? '' : value;
    data = (data) ? data.toLowerCase() : '';
    if (data.indexOf('notes') > -1 || data.indexOf('description') > -1 || data.indexOf('subject') > -1 || data.indexOf('title') > -1
      || data.indexOf('response') > -1 || data.indexOf('outcome') > -1
      || data.indexOf('point') > -1 || data.indexOf('comments') > -1) {
      value = value;
    } else if (value.indexOf(':') !== -1 && value.indexOf('|') !== -1) {
      value = value.split('|').map(_i => _i.split(':')[1]).join(',');
    } else if (value.indexOf(':') !== -1) {
      value = value.split(':')[1]
    }
    return value;
  }
  errorAttch() {
    this.dialog.open(DynamicDialogComponent, {
      width: '400px',
      data: {
        title: 'FAILED', message: 'Something went wrong while deleting the attachment, Please try again',
        btnNegativeLabel: 'OK'
      }
    });
  }

  openDiscussion(FORM_NAME, FORM_TYPE, FORM_ID) {
    this.dialog.open(ListDiscussionComponent, {
      width: '70vw',
      data: { FORM_NAME, FORM_TYPE, FORM_ID }
    });
  }

  sanitize(data) {
    return (data) ? this.sanitizer.bypassSecurityTrustHtml(data.replace(new RegExp('\n', 'g'), '<br />')) : data;
  }
}
