import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Session } from '../../providers/application/session/session.service';
@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.scss']
})
export class SelectCityComponent implements OnInit {
  cityCtrl = new FormControl();
  constructor(public dialogRef: MatDialogRef<SelectCityComponent>, @Inject(MAT_DIALOG_DATA) public data,
    private session: Session) { }
  cityList = [];
  filterCity = [];
  selectedCity = '';
  ctrl: FormControl = new FormControl();
  ngOnInit(): void {
    this.cityList = this.data || [];
    this.ctrl.setValue(this.session.getPreferredCity());
    this.ctrl.valueChanges.subscribe((v) => {
      this.selectedCity = v;
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
