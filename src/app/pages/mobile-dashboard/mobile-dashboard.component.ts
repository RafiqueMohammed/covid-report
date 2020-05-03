import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ViewContainerRef, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { API } from '../../providers/webservice/api.service';
import { Helper } from '../../providers/application/utils/helper.service';
import { ShowSpinnerService } from 'src/app/shared/show-spinner/show-spinner.service';
import { Session } from 'src/app/providers/application/session/session.service';
import { CityTableComponent } from 'src/app/shared/city-table/city-table.component';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectCityComponent } from '../../shared/select-city/select-city.component';
import { MatDialog } from '@angular/material/dialog';
import { PreferredCityComponent } from 'src/app/shared/preferred-city/preferred-city.component';

@Component({
  selector: 'app-mobile-dashboard',
  templateUrl: './mobile-dashboard.component.html',
  styleUrls: ['./mobile-dashboard.component.scss'],
  entryComponents: [SelectCityComponent]
})
export class MobileDashboardComponent implements OnInit, AfterViewInit {
  showLastUpdated: boolean = false;
  dataSource: any;
  dashboardGraph: any;
  totalStatistics: any;
  stateWiseData: any;
  stateWiseDataSource: any;
  cityWiseDataSource: any;
  allCityListData: [];
  isDataLoaded: boolean = false;
  guestName: string = 'Stranger';
  columnsToDisplay = ['state', 'confirmed', 'active', 'recovered', 'deaths'];
  expandedState: Array<ViewContainerRef> = [];
  cityList = [];
  @ViewChild('cityContainer', { read: ViewContainerRef }) preferredView: ViewContainerRef;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChildren('stateRow', { read: ViewContainerRef }) stateRow: QueryList<ViewContainerRef>;
  constructor(private api: API, public helper: Helper, private spinnerService: ShowSpinnerService,
    public session: Session, private resolver: ComponentFactoryResolver, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getDashboardStats();
    this.getCityWiseData();
    this.guestName = this.session.getGuestName();

  }
  ngAfterViewInit() {
    setTimeout(() => { this.spinnerService.startSpinning();
    }, 0)
  }
  getDashboardStats() {
    this.api.getStateWiseData().subscribe((response) => {
      // delaying intentionally
      setTimeout(() => {
        this.dataSource = response;
        this.totalStatistics = response.statewise.shift();
        this.stateWiseData = response.statewise.map((item, i) => {
          item.expanded = false;
          return item;
        });
        this.stateWiseDataSource = new MatTableDataSource(this.stateWiseData);

        this.stateWiseDataSource.sort = this.sort;

        this.isDataLoaded = true;
        this.spinnerService.stopSpinning();
      }, 500);
    });
  }

  getCityWiseData() {
    this.api.getDistrictWiseData().subscribe(response => {
      this.cityWiseDataSource = response;
      this.filterOnlyCity();
      this.loadPreferredView();

    })
  }

  onRowTouch(index, rowData, elem) {

    if (Object.keys(this.cityWiseDataSource).length === 0) {
      return;
    }

    // console.log(this.stateRow.toArray()[index],elem,this.stateRow.toArray()[index].element.nativeElement === elem);

    const container = this.stateRow.toArray()[index];
    const containerPos = this.expandedState.indexOf(container);
    if (containerPos == -1) {
      const resolved = this.resolver.resolveComponentFactory(CityTableComponent);
      const compRef = container.createComponent(resolved);
      compRef.instance.stateData = rowData;
      compRef.instance.cityData = this.cityWiseDataSource[rowData.state] || {};
      this.expandedState.push(container);
      this.stateWiseDataSource.data[index].expanded = true;
    } else {
      container.clear();
      this.expandedState.splice(containerPos, 1);
      this.stateWiseDataSource.data[index].expanded = false;

    }

    // console.log(this.expandedState);
    // this.stateRow
  }

  sortData(sortInfo: Sort) {


    const data = this.stateWiseData.slice();
    if (!sortInfo.active || sortInfo.direction === '') {
      this.stateWiseDataSource = new MatTableDataSource(data);
      return;
    }

    let _data = data.sort((a, b) => {
      const isAsc = sortInfo.direction === 'asc';
      switch (sortInfo.active) {
        case 'state': return this.compare(a.state, b.state, isAsc);
        // case 'confirmed': return this.compare(a.confirmed, b.confirmed, isAsc);
        // case 'active': return this.compare(a.active, b.active, isAsc);
        // case 'recovered': return this.compare(a.recovered, b.recovered, isAsc);
        // case 'deaths': return this.compare(a.deaths, b.deaths, isAsc);
        default: return 0;
      }
    });
    this.stateWiseDataSource = new MatTableDataSource(_data);
    this.stateRow.notifyOnChanges();
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  refreshData() {
    this.isDataLoaded = false;
    this.spinnerService.startSpinning();
    this.getDashboardStats();

  }
  filterOnlyCity() {
    Object.keys(this.cityWiseDataSource).forEach((element, i) => {
      this.cityList = [...this.cityList, ...Object.keys(this.cityWiseDataSource[element].districtData)];
      this.allCityListData = { ...this.allCityListData, ...this.cityWiseDataSource[element].districtData }
    });
  }
  getCityData(cityName) {
    return this.allCityListData[cityName] || {};
  }
  loadPreferredView() {
    this.preferredView.clear();
    const resolver = this.resolver.resolveComponentFactory(PreferredCityComponent);
    const container = this.preferredView.createComponent(resolver);
    const city = this.session.getPreferredCity();
    container.instance.cityData = this.getCityData(city);
  }
  selectPreferredCity() {
    const dialogRef = this.dialog.open(SelectCityComponent, {
      width: '300px',
      data: this.cityList
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.session.setPreferredCity(result);
        this.loadPreferredView();
      }
    });

  }

}
