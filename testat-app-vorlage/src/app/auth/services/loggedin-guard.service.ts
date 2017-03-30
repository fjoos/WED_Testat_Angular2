import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {NavigationService} from "../../core";


@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private auth: AuthService, private router: NavigationService) {}

  canActivate() {

    console.log("canActive");
    if (this.auth.loggedIn()) {
      this.router.goToDashboard();
      console.log("canActive: true");
      return true;
    }
    console.log("canActive: false");
    return false;
  }
}
