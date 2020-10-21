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
  numberFormat(labelValue) {

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

      ? (Math.abs(Number(labelValue)) / 1.0e+9 ).toFixed(1)+ "B"
      // Six Zeroes for Millions 
      : Math.abs(Number(labelValue)) >= 1.0e+6

        ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(1) + "M"
        // Three Zeroes for Thousands
        : Math.abs(Number(labelValue)) >= 1.0e+3

          ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(1) + "K"

          : Number(labelValue);

  }

}
