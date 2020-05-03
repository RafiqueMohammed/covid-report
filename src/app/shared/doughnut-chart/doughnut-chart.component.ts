import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {
  isDataLoaded: boolean = false;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(141, 27, 167, 0.7)', 'rgba(211, 74, 166, 0.7)', 'rgba(148,159,177,0.7)'],
    },
  ];
  @Input() doughnutChartLabels: Label[] = ['Active', 'Recovered', 'Deaths'];
  @Input() doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';
  
  constructor() { }

  ngOnInit(): void {
  }

}
