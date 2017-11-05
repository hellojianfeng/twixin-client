import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { BackendService } from "./shared";
import { LoginService } from "./shared";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) { }

  canActivate() {
    if (BackendService.isLoggedIn()) {
      //if(this.router.url === '/'){
        return this.loginService.isAuthorized()
        .map(res => {
          if(res.ok){
            return true;
          } else {
            return false;
          }
        }).catch( error => {
          this.router.navigate(["/login"]);
          return Observable.of(false);
        })
    }
    else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}

