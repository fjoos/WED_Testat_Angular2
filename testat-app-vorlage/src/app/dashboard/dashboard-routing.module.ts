import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { LogoutComponent } from "../auth/components";
import { TransactionComponent } from "./components/transaction.component";
import { HomeComponent } from "./components/home.component";


const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent, // TODO: Add initial router outlet dashboard component...
    children: [
      // TODO: Add routing path for dashboard here...
      { path: '', component: HomeComponent },
      { path: 'transactions', component: TransactionComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashbaordRoutingModule {}
