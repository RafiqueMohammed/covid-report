import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartsModule} from 'ng2-charts';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ShowSpinnerComponent } from './show-spinner/show-spinner.component';

const shared:Array<any>=[LineChartComponent,ShowSpinnerComponent];

@NgModule({
  declarations: shared,
  imports: [
    CommonModule,
    ChartsModule

  ],
  exports:shared
})
export class SharedModule { }
