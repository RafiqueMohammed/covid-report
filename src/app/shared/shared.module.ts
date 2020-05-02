import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ShowSpinnerComponent } from './show-spinner/show-spinner.component';
import { CityTableComponent } from './city-table/city-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

const shared: Array<any> = [LineChartComponent, ShowSpinnerComponent, CityTableComponent];

@NgModule({
  declarations: shared,
  imports: [
    CommonModule,
    ChartsModule,
    MatTableModule,
    MatIconModule
  ],
  exports: shared
})
export class SharedModule { }
