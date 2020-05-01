import { Component, OnInit, ViewChild, ElementRef, Query } from '@angular/core';
import { API } from '../../providers/webservice/api.service';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataSource: any;
  dashboardGraph: any;
  totalStatistics: any;
  stateWiseDataSource: any;
  isDataLoaded: boolean = false;
  public doughnutChartLabels: Label[] = ['Active', 'Recovered', 'Deaths'];
  public doughnutChartData: MultiDataSet = [];
  columnsToDisplay = ['state', 'confirmed', 'active', 'recovered', 'deaths'];

  public doughnutChartType: ChartType = 'doughnut';

  public pieChartColors = [
    {
      backgroundColor: ['rgba(141, 27, 167, 0.7)', 'rgba(211, 74, 166, 0.7)', 'rgba(148,159,177,0.7)'],
    },
  ];
  constructor(private api: API) {
    this.getDashboardStats();

  }

  getDashboardStats() {
    this.api.getStateWiseData().subscribe((response) => {
      this.dataSource = response;
      this.totalStatistics = response.statewise.shift();
      console.log(response.statewise, 'statewaise');
      this.stateWiseDataSource = response.statewise;
      this.isDataLoaded = true;
      this.drawGraph();
    });
  }
  ngOnInit(): void {

  }
  drawGraph() {
    this.doughnutChartData = [this.totalStatistics.active, this.totalStatistics.recovered, this.totalStatistics.deaths]
  }
}
