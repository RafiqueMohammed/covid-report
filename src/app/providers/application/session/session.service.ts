import { Injectable } from '@angular/core';

import { LocalStorage } from '../storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class Session {

  private DEFAULT_INFO: GuestInfo = { name: 'Guest', isFirstTime: true, skip: false, preferred_city: '' };
  private GUEST_INFO = 'guest_info';
  private IS_FIRST_TIME = 'isFirstTime';
  private PREFERRED_CITY = 'preferred_city';
  private GUEST_NAME = 'name';
  constructor(private storage: LocalStorage) { }

  public saveSession(_data: GuestInfo) {
    this.storage.saveAsString(this.GUEST_INFO, _data);
  }
  public getSession(): GuestInfo {
    return (this.storage.get(this.GUEST_INFO)) ? JSON.parse(this.storage.get(this.GUEST_INFO)) : this.DEFAULT_INFO;
  }
  public clearAll() {
    this.storage.saveAsString(this.GUEST_INFO, this.DEFAULT_INFO);
  }
  public getGuestName() {
    return this.getSession()[this.GUEST_NAME];
  }
  public setGuestName(name) {
    const _data = this.getSession();
    _data[this.GUEST_NAME] = name;
    this.storage.saveAsString(this.GUEST_INFO, _data);
  }
  public setFirstTimeVisit(firstTime) {
    const _data = this.getSession();
    _data[this.IS_FIRST_TIME] = firstTime;
    this.storage.saveAsString(this.GUEST_INFO, _data);
  }
  public getPreferredCity() {
    return this.getSession()[this.PREFERRED_CITY];
  }
  public setPreferredCity(city) {
    const _data = this.getSession();
    _data[this.PREFERRED_CITY] = city;
    this.storage.saveAsString(this.GUEST_INFO, _data);
  }
  public isFirstTime() {
    return this.getSession()[this.IS_FIRST_TIME];
  }
}

export interface GuestInfo {
  name: string;
  preferred_city: string;
  skip: boolean;
  isFirstTime: boolean;
}
