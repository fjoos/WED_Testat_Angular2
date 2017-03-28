import {NgModule, ModuleWithProviders} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {RequestOptions} from "@angular/http";

import {AuthService, SecurityTokenStore} from "./services";
import {AuthResourceService, AuthRequestOptions} from "./resources";

import {LoginComponent, LogoutComponent,
  RegisterComponent} from "./components";
import {SharedModule} from "../shared/shared.module";
import {NotLoggedInGuard} from "./services/notloggedin-guard.service";
import {LoggedInGuard} from "./services/loggedin-guard.service";

@NgModule({
  declarations: [
    // TODO: Add declarations here, if additional components are placed within the Auth module
    LoginComponent, LogoutComponent, RegisterComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    // TODO: Add declarations here, if additional components are placed within the Auth module
    LoginComponent, LogoutComponent, RegisterComponent
  ],
  providers: [ NotLoggedInGuard, LoggedInGuard ]
})
export class AuthModule {
  static forRoot(config?: {}): ModuleWithProviders {

    return {
      ngModule: AuthModule,
      providers: [
        // DI Providers (Services, Tokens, Factories...) to be used globally and instantiated only once

        // TODO: Add services/guards/... here, if additional classes are placed within the Auth module
        AuthResourceService,
        AuthService,
        SecurityTokenStore,
        {
          provide: RequestOptions,
          useFactory: AuthRequestOptions.createFromTokenStore,
          deps: [SecurityTokenStore]
        }]
    };
  }
}
