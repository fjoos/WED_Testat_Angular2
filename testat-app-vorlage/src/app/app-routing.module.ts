import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {RegisterComponent } from './auth/components/register.component';

const appRoutes: Routes = [

  // TODO: Add routing of lazy loaded dashboard Module (with guards) here...
  //{ path: 'dashboard', component: DashboardModule, canActivate=[]},

// { path: 'dashboard', pathMatch: './dashboard/dashboard.Module#DashbaordRoutingModule' },

  // TODO: Add routing of eagerly loaded modules here...
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
