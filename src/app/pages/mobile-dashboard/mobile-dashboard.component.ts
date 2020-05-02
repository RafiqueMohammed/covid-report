import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChildren, QueryList, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { API } from '../../providers/webservice/api.service';
import { Helper } from '../../providers/application/utils/helper.service';
import { ShowSpinnerService } from 'src/app/shared/show-spinner/show-spinner.service';
import { Session } from 'src/app/providers/application/session/session.service';
import { CityTableComponent } from 'src/app/shared/city-table/city-table.component';

@Component({
  selector: 'app-mobile-dashboard',
  templateUrl: './mobile-dashboard.component.html',
  styleUrls: ['./mobile-dashboard.component.scss']
})
export class MobileDashboardComponent implements OnInit, AfterViewInit {
  showLastUpdated: boolean = false;
  dataSource: any;
  dashboardGraph: any;
  totalStatistics: any;
  stateWiseDataSource: any;
  cityWiseDataSource: any;
  isDataLoaded: boolean = false;
  guestName: string = 'Stranger';
  columnsToDisplay = ['state', 'confirmed', 'active', 'recovered', 'deaths'];
  @ViewChildren('stateRow', { read: ViewContainerRef }) stateRow: QueryList<ViewContainerRef>;
  public lineChartColors = [];
  constructor(private api: API, public helper: Helper, private spinnerService: ShowSpinnerService,
    private session: Session, private resolver: ComponentFactoryResolver) {

  }

  ngOnInit(): void {
    this.getDashboardStats();
    this.getCityWiseData();
    this.guestName = this.session.getSession()['name'];
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
  ngAfterViewInit() {
    setTimeout(() => { this.spinnerService.startSpinning(); }, 0)

  }
  getDashboardStats() {
    this.api.getStateWiseData().subscribe((response) => {
      // delaying intentionally
      setTimeout(() => {
        this.dataSource = response;
        this.totalStatistics = response.statewise.shift();
        this.stateWiseDataSource = response.statewise.map(item => {item.expanded = false; return item;});
        console.log(this.stateWiseDataSource,'ss');
        this.isDataLoaded = true;
        this.spinnerService.stopSpinning();
      }, 500);
    });
  }

  getCityWiseData() {
    this.api.getDistrictWiseData().subscribe(response => {
      this.cityWiseDataSource = response;
    })
  }

  expandedState: Array<ViewContainerRef> = [];
  onRowTouch(index, rowData) {
    if (Object.keys(this.cityWiseDataSource).length === 0) {
      return;
    }
    const container = this.stateRow.toArray()[index];
    const containerPos = this.expandedState.indexOf(container);
    if (containerPos == -1) {
      const resolved = this.resolver.resolveComponentFactory(CityTableComponent);
      const compRef = container.createComponent(resolved);
      compRef.instance.stateData = rowData;
      compRef.instance.cityData = this.cityWiseDataSource[rowData.state] || {};
      this.expandedState.push(container);
      this.stateWiseDataSource[index].expanded=true;
    } else {
      container.clear();
      this.expandedState.splice(containerPos, 1);
      this.stateWiseDataSource[index].expanded=false;

    }

    console.log(this.expandedState);
    // this.stateRow
  }



}
