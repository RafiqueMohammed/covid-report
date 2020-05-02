import { Injectable } from '@angular/core';

import { LocalStorage } from '../storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class Session {

  private DEFAULT_INFO: GuestInfo = { name: 'Guest', isFirstTime: true, skip: false };
  private GUEST_INFO = 'guest_info';
  private IS_FIRST_TIME = 'isFirstTime';
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

  public isFirstTime() {
    return this.getSession()[this.IS_FIRST_TIME];
  }
}

export interface GuestInfo {
  name: string;
  skip: boolean;
  isFirstTime: boolean;
}
