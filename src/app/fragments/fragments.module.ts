import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import {ChartsModule} from 'ng2-charts';


const fragments:Array<any>=[HeaderComponent,FooterComponent,LineChartComponent];
@NgModule({
  declarations: fragments,
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports:fragments
})
export class FragmentsModule { }
