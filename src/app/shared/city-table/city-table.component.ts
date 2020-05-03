import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Helper } from '../../providers/application/utils/helper.service';

@Component({
  selector: 'app-city-table',
  templateUrl: './city-table.component.html',
  styleUrls: ['./city-table.component.scss']
})
export class CityTableComponent implements OnInit {
  @Input() cityData: any = {};
  @Input() stateData = [];
  loaded: boolean = false;
  cityRows = [];
  columnsToDisplay = ['state', 'confirmed', 'active', 'recovered', 'deaths'];

  constructor(public helper:Helper) { }

  ngOnInit() {
    if (this.cityData) {
      Object.keys(this.cityData.districtData).map((city, i) => {
        this.cityRows.push({ city, ...this.cityData.districtData[city] })
      });
      this.loaded = true;
    }
    console.log(this.stateData, this.cityData, 'statedata');
  }

}
