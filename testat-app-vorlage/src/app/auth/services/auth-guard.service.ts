import { CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {NavigationService} from "../../core";


@Injectable()
export class AuthGuard implements CanLoad {

  constructor(private auth: AuthService, private router: NavigationService) {}

  canLoad() {
    if (this.auth.loggedIn()) {
      this.router.goToHome();
      return false;
    }
    return true;
  }

}