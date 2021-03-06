import {NgModule, ModuleWithProviders} from '@angular/core';

import {SharedModule} from "../shared/shared.module";

import {DashbaordRoutingModule} from "./dashboard-routing.module";
import {AuthModule} from "../auth/auth.module";
import {TransactionComponent, HomeComponent, DashboardComponent} from "./components";
import {HomeService, TransactionService} from "./services"
import {HomeResourceService, TransactionResourceService} from "./resources"


@NgModule({
  declarations: [
    // Declarations (Components / Directives) used from/within the Module
    DashboardComponent, TransactionComponent, HomeComponent
  ],
  imports: [
    // Other Modules to import (imports the exported Components/Directives from the other module)
    SharedModule, DashbaordRoutingModule, AuthModule
  ],
  exports: [
    // Components/Directives (or even Modules) to export (available for other modules; and forRoot() )
  ],
  providers: [
    // DI Providers (Services, Tokens, Factories...), may be instantiated multiple times
    HomeService, HomeResourceService, TransactionService, TransactionResourceService
  ]
})
export class DashboardModule {
  static forRoot(config?:{}) : ModuleWithProviders {
    return {
      ngModule: DashboardModule,
      providers: [ ]
    };
  }

}
