import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowSpinnerService {
  private $observer: BehaviorSubject<SpinnerModel> = new BehaviorSubject( { show: false });

  constructor() { }

  startSpinning(data: SpinnerModel = { show: true }) {
    if (data !== null) {
      this.$observer.next(data);
    }
  }
  stopSpinning(data: SpinnerModel = { show: true }) {
    if (data !== null) {
      this.$observer.next(data);
    }
  }
  listen(): Observable<SpinnerModel> {
    return this.$observer.asObservable();
  }
}

export interface SpinnerModel {
  show: boolean,
  applyFor?: string
}
