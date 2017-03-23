import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth-guard.service';
import { LoggedInGuard } from './auth/services/loggedin-guard.service';


const appRoutes: Routes = [

  // TODO: Add routing of lazy loaded dashboard Module (with guards) here...canLoad: [AuthGuard]
  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule' },

  // TODO: Add routing of eagerly loaded modules here...canActivate: [LoggedInGuard]
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
