import {Injectable} from '@angular/core';

/**
 * TODO: Add localStorage logic here...
 */
@Injectable()
export class SecurityTokenStore {
  private token:SecurityToken;

  constructor() {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
  }

  public get storedValue():SecurityToken {
    return this.token;
  }

  public set storedValue(value:SecurityToken) {
    this.token = value;
    localStorage.setItem('currentUser', (value) ? JSON.stringify(value) : null);
  }
}

export interface SecurityToken {
  token: string,
  owner: any
}
