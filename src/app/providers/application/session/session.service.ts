import { Injectable } from '@angular/core';

import { LocalStorage } from '../storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class Session {

  private USER_INFO = 'user_info';
  private IS_LOGGED_IN = 'active';
  private default_userInfo: LoggedUser = { active: false, cecID: '',roles:'',rolesInfo:{} };
  constructor(private storage: LocalStorage) { }

  public saveSession(_data: LoggedUser) {
    this.storage.saveAsString(this.USER_INFO, _data);
  }

  public getSession(): LoggedUser {
    // const _s = (this.storage.get(this.USER_INFO)) ? this.storage.get(this.USER_INFO) : {};
    return (this.storage.get(this.USER_INFO)) ? JSON.parse(this.storage.get(this.USER_INFO)) : this.default_userInfo;
  }
  public clearAll(){
    this.storage.saveAsString(this.USER_INFO, {});
  }

  public isLoggedIn() {
    return this.getSession()[this.IS_LOGGED_IN];
  }
}

export interface LoggedUser {
  cecID: string;
  active: boolean;
  roles:string;
  rolesInfo:any
}
