import { Injectable } from "@angular/core";
import { getString, setString } from "application-settings";

const tokenKey = "token";

export class BackendService {
  // static apiUrl = "https://5f89e936.ngrok.io/api/";
  static apiUrl = "http://localhost:4040/api/";

  static isLoggedIn(): boolean {
    return !!getString("token");
  }

  static get token(): string {
    return getString("token");
  }

  static set token(theToken: string) {
    setString("token", theToken);
  }

}
