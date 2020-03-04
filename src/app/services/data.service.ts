import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private us: UserService) { }

  apiLink = 'https://woodworks-api.herokuapp.com';

  getrequest(url: string) {
    return this.http.get(url);
  }


  reqPost(url, data) {
    return this.http.post<any>(
      this.apiLink + url,
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + this.us.getTokenDetails()
        }
      }
    );
  }



  auth(url, body) {
    try {
      return this.http.post<any>(
        this.apiLink + url,
        body,
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
    } catch (e) {
      console.log(e);
    }
  }



}
