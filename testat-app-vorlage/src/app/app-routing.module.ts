import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth-guard.service';
import { LoggedInGuard } from './auth/services/loggedin-guard.service';


const appRoutes: Routes = [

  // TODO: Add routing of lazy loaded dashboard Module (with guards) here...
  //{ path: 'dashboard', component: DashboardModule, canActivate=[]},
  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule', canLoad: [AuthGuard] },

  // TODO: Add routing of eagerly loaded modules here...
  { path: '', redirectTo: '/welcome', pathMatch: 'full', canActivate: [LoggedInGuard]  }
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
