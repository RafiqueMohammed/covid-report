import { Component, OnInit } from '@angular/core';
import { API } from '../../providers/webservice/api.service';

@Component({
  selector: 'app-mobile-dashboard',
  templateUrl: './mobile-dashboard.component.html',
  styleUrls: ['./mobile-dashboard.component.scss']
})
export class MobileDashboardComponent implements OnInit {
  showLastUpdated: boolean = false;
  dataSource: any;
  dashboardGraph: any;
  totalStatistics: any;
  stateWiseDataSource: any;
  isDataLoaded: boolean = false;
  public lineChartColors = [];
  constructor(private api: API) { }

  ngOnInit(): void {
    this.getDashboardStats();
    this.lineChartColors = [
      { // active -theme color  rgba(16, 55, 98,0.2)
        backgroundColor: 'rgba(58, 125, 193,0.2)',
        borderColor: '#3a7dc1',
        pointBackgroundColor: '#3a7dc1',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#3a7dc1'
      },
      { // recovered - green
        backgroundColor: 'rgba(211, 74, 166, 0.1)',
        borderColor: '#D34AA6',
        pointBackgroundColor: '#D34AA6',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#D34AA6'
      },
      { // death - grey
        backgroundColor: 'rgba(148,159,177,0.1)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];
  }
  getDashboardStats() {
    this.api.getStateWiseData().subscribe((response) => {
      this.dataSource = response;
      this.totalStatistics = response.statewise.shift();
      this.stateWiseDataSource = response.statewise;
      this.isDataLoaded = true;
      // this.drawGraph();
    });
  }
  // drawGraph() {
  //   this.doughnutChartData = [this.totalStatistics.active, this.totalStatistics.recovered, this.totalStatistics.deaths]
  // }
}
