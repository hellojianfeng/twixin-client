import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";

import { User } from "../models/user.model";
import { BackendService } from "./backend.service";

@Injectable()
export class LoginService {
  public headers;
  constructor(private http: Http) { 
    this.headers = new Headers();
    this.headers.append("Authorization", "Bearer " + BackendService.token);
  }

  register(user: User) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post(
      BackendService.apiUrl + "Users",
      {
        username: user.mobile,
        mobile: user.mobile,
        password: user.password
      },
      { headers: headers }
    )
    .catch(this.handleErrors);
  }

  login(user: User) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    const that = this;

    return this.http.post(
      BackendService.apiUrl + "oauth/token",
      {
        username: user.mobile,
        password: user.password,
        grant_type: "password"
      },
      { headers: headers }
    )
    .switchMap(response => {
      const data = response.json();
      BackendService.token = data.Result.access_token || data.Result.accessToken;
      headers.append("Authorization", "Bearer " + BackendService.token);
      return that.http.get(BackendService.apiUrl + "users/me", {headers})
      .map(response => {
        const data = response.json();
        BackendService.me = data.me;
      });
    })
    .catch(this.handleErrors);
  }

  logoff() {
    BackendService.token = "";
    BackendService.me = null;
  }

  resetPassword(email) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post(
      BackendService.apiUrl + "Users/resetpassword",
      JSON.stringify({
        Email: email
      }),
      { headers: headers }
    ).catch(this.handleErrors);
  }

  isAuthorized(){
    this.headers = new Headers();
    this.headers.append("Authorization", "Bearer " + BackendService.token);
    return this.http.get(
      BackendService.apiUrl + 'users/me',
      { headers: this.headers }
    )
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}
