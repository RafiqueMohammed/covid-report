import { Component, OnInit, ViewChild, ElementRef, Query } from '@angular/core';
import { API } from '../../providers/webservice/api.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Model } from '../../config/model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dashboardGraph: any;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];

  columnsToDisplay = ['state', 'confirmed', 'active', 'recovered', 'deaths'];
  stateWiseDataSource: any = [];
  timewiseData: any = [];
  totalStatistics: any = {};
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'right',
          gridLines: {
            display: false
          }
        }
      ],

    },
    legend: {
      position: 'bottom'
    },
    annotation: {
      annotations: [

      ],
    },

  };
  public lineChartColors: Color[] = [
    { // active -theme color
      backgroundColor: 'rgba(141, 27, 167, 0.1)',
      borderColor: '#8D1BA7',
      pointBackgroundColor: '#8D1BA7',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#8D1BA7'
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
  public lineChartLegend = true;
  public lineChartType = 'line';


  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  constructor(private api: API) {
    this.getDashboardStats();

  }

  getDashboardStats() {
    this.api.getStateWiseData().subscribe((response) => {
      this.totalStatistics = response.statewise.shift();
      console.log(response.statewise, 'statewaise');
      this.timewiseData = response.cases_time_series;
      this.stateWiseDataSource = response.statewise;
      this.drawGraphByDay();
    });
  }
  ngOnInit(): void {

  }
  drawGraphByMonth() {
    // this.lineChartData = [
    //   { data: [0,this.totalStatistics.active], label: 'Active' },
    //   { data: [0, this.totalStatistics.recovered], label: 'Recovered' },
    //   { data: [0, this.totalStatistics.deaths], label: 'Deaths' },
    // ];
    // this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const monthList = [];
    const monthCasesForConfirmed = [];
    const monthCasesForRecovered = [];
    const monthCasesForDeaths = [];
    this.timewiseData.forEach((itemBydate: Model.TimeSeries) => {
      const _stripMonth = itemBydate.date.split(' ')[1];
      let _monthPos = monthList.indexOf(_stripMonth);
      if (_monthPos > -1) {
        monthCasesForConfirmed[_monthPos] = parseInt(monthCasesForConfirmed[_monthPos]) + parseInt(itemBydate.dailyconfirmed);
        monthCasesForRecovered[_monthPos] = parseInt(monthCasesForRecovered[_monthPos]) + parseInt(itemBydate.dailyrecovered);
        monthCasesForDeaths[_monthPos] = parseInt(monthCasesForDeaths[_monthPos]) + parseInt(itemBydate.dailydeceased);
      } else {
        monthList.push(_stripMonth);
        _monthPos = monthList.indexOf(_stripMonth);

        monthCasesForConfirmed[_monthPos] = (itemBydate.dailyconfirmed);
        monthCasesForRecovered[_monthPos] = (itemBydate.dailyrecovered);
        monthCasesForDeaths[_monthPos] = (itemBydate.dailydeceased);
      }
    });

    this.lineChartData = [
      { data: monthCasesForConfirmed, label: 'Active' },
      { data: monthCasesForRecovered, label: 'Recovered' },
      { data: monthCasesForDeaths, label: 'Deaths' },
    ];
    this.lineChartLabels = monthList;

    console.log(this.lineChartData, 'this.lineChartData')
  }
  drawGraphByDay() {
    // this.lineChartData = [
    //   { data: [0,this.totalStatistics.active], label: 'Active' },
    //   { data: [0, this.totalStatistics.recovered], label: 'Recovered' },
    //   { data: [0, this.totalStatistics.deaths], label: 'Deaths' },
    // ];
    // this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const monthList = [];
    const monthCasesForConfirmed = [];
    const monthCasesForRecovered = [];
    const monthCasesForDeaths = [];
    this.timewiseData.forEach((itemBydate: Model.TimeSeries) => {
      const _stripMonth = itemBydate.date;
      let _monthPos = monthList.indexOf(_stripMonth);
      if (_monthPos > -1) {
        monthCasesForConfirmed[_monthPos] = parseInt(monthCasesForConfirmed[_monthPos]) + parseInt(itemBydate.dailyconfirmed);
        monthCasesForRecovered[_monthPos] = parseInt(monthCasesForRecovered[_monthPos]) + parseInt(itemBydate.dailyrecovered);
        monthCasesForDeaths[_monthPos] = parseInt(monthCasesForDeaths[_monthPos]) + parseInt(itemBydate.dailydeceased);
      } else {
        monthList.push(_stripMonth);
        _monthPos = monthList.indexOf(_stripMonth);

        monthCasesForConfirmed[_monthPos] = (itemBydate.dailyconfirmed);
        monthCasesForRecovered[_monthPos] = (itemBydate.dailyrecovered);
        monthCasesForDeaths[_monthPos] = (itemBydate.dailydeceased);
      }
    });

    this.lineChartData = [
      { data: monthCasesForConfirmed, label: 'Active' },
      { data: monthCasesForRecovered, label: 'Recovered' },
      { data: monthCasesForDeaths, label: 'Deaths' },
    ];
    this.lineChartLabels = monthList;

    console.log(this.lineChartData, 'this.lineChartData')
  }
}
