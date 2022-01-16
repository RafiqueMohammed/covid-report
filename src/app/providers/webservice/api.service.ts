import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../../config/endpoints';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class API {

  constructor(public http: HttpClient) {
  }
  getStateWiseData(): Observable<any> {
    return this.http.get(Endpoints.STATEWISE_DATA);
  }
  getDistrictWiseData(): Observable<any> {
    return this.http.get(Endpoints.DISTRICTWISE_DATA);
  }

}
