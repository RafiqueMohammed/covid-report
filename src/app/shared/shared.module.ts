import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ShowSpinnerComponent } from './show-spinner/show-spinner.component';
import { CityTableComponent } from './city-table/city-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PreferredCityComponent } from './preferred-city/preferred-city.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectCityComponent } from './select-city/select-city.component';

const shared: Array<any> = [LineChartComponent, ShowSpinnerComponent, CityTableComponent, PreferredCityComponent, SelectCityComponent];

@NgModule({
  declarations: shared,
  imports: [
    CommonModule,
    ChartsModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: shared
})
export class SharedModule { }
