import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {NavigationService} from "../../core";


@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private auth: AuthService, private router: NavigationService) {}

  canActivate() {
    if (this.auth.loggedIn()) {
      this.router.goToDashboard();
      return false;
    }
    return true;
  }
}
