import { Component, OnInit } from '@angular/core';
import { API } from '../../providers/webservice/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  columnsToDisplay=['state','confirmed','active','recovered','deaths'];
  stateWiseDataSource: any = [];
  totalStatistics: any = {};
  constructor(private api: API) {
    this.getDashboardStats();
  }

  getDashboardStats() {
    this.api.getStateWiseData().subscribe((response) => {
      this.totalStatistics = response.statewise.shift();
      console.log(response.statewise,'statewaise');
      this.stateWiseDataSource=response.statewise;
    });
  }
  ngOnInit(): void {

  }

}
