import { CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {NavigationService} from "../../core";


@Injectable()
export class NotLoggedInGuard implements CanLoad {

  constructor(private auth: AuthService, private router: NavigationService) {}

  canLoad() {
    console.log("canLoad");
    if (!this.auth.loggedIn()) {
      this.router.goToUrl('welcome');
      return true;
    }
    return false;
  }

}
