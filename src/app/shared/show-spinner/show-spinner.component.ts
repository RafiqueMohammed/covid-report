import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';
import { ShowSpinnerService, SpinnerModel } from './show-spinner.service';

@Component({
  selector: 'app-show-spinner',
  templateUrl: './show-spinner.component.html',
  styleUrls: ['./show-spinner.component.scss'],
  entryComponents: [MatSpinner]

})
export class ShowSpinnerComponent implements OnInit, AfterViewInit {

  constructor(private resolver: ComponentFactoryResolver, private spinnerService: ShowSpinnerService) { }
  @ViewChild('showLoader', { read: ViewContainerRef }) spinnerContainer: ViewContainerRef;
  @Input() size = '28';
  ngOnInit(): void {
    this.spinnerService.listen().subscribe((data: SpinnerModel) => {
      if (data) {
        if (data.show == true) {
          this.addSpinner();
        } else {
          this.removeSpinner();
        }
      }

    });
  }
  ngAfterViewInit() {

  }
  addSpinner() {
    if (this.spinnerContainer) {
      this.spinnerContainer.clear();
      const factory = this.resolver.resolveComponentFactory(MatSpinner);
      this.spinnerContainer.createComponent(factory).instance.diameter = parseInt(this.size);
    }
  }
  removeSpinner() {
    if (this.spinnerContainer&&this.spinnerContainer.get(0)) {
      this.spinnerContainer.remove(0);
    }
  }
}
