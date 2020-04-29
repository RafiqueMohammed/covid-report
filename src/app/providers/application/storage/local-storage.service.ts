import { Injectable } from '@angular/core';

@Injectable({
  providedIn:"root"
})
export class LocalStorage {

  ls = localStorage;
  constructor() {

  }

  public saveAsString(key, _obj) {
    if (_obj) {
      this.ls.setItem(key, JSON.stringify(_obj));
    }
  }

  public save(key, data) {
    if (data) {
      this.ls.setItem(key, data);
    }
  }

  public get(key) {
    let a = this.ls.getItem(key);
    if (a !== null) {
      return this.ls.getItem(key);
    }
  }

  public isExist(key) {
    return (this.ls.getItem(key) === null) ? false : true;

  }


}
