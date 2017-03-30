import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent, RegisterComponent} from "../auth/components";
import {WelcomeComponent} from "./welcome.component";
import {LoggedInGuard} from "../auth/services/loggedin-guard.service";
import {NotLoggedInGuard} from "../auth/services/notloggedin-guard.service";

const appRoutes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    // TODO: Add guard and routing (Register/Login) here...
    canActivate: [LoggedInGuard],
    //canLoad: [NotLoggedInGuard],
    children: [
      { path: '', component: LoginComponent},
      { path: 'register', component: RegisterComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes) // !forChild() important
  ],
  exports: [
    RouterModule
  ]
})
export class WelcomeRoutingModule {}
