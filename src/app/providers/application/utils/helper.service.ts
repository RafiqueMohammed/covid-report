import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Helper {

  constructor() { }

  public formatCount(count) {
    try {
      return (new Intl.NumberFormat()).format(count);
    } catch (e) {
      return 0;
    }
  }

}
