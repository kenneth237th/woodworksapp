import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userInfo: any;
  token: string;

  constructor() { }

  setUserDetails(userInfo) {
    this.userInfo = userInfo;
    this.token = userInfo.jwt;
  }

  getUserDetails() {
    return this.userInfo;
  }

  getTokenDetails() {
    return this.token;
  }

}
