import {Injectable} from '@angular/core';
import {Response, Http} from "@angular/http";
import {Observable} from "rxjs";

//import {LoginInfo, Account, RegistrationInfo, Credential} from "../models";
import {ResourceBase} from "../../auth/resources/resource-base";
import {TransactionInfo, Result} from "../models";
//import {isArray} from "util";

@Injectable()
export class TransactionResourceService extends ResourceBase {
  constructor(http: Http) {
    super(http);
  }

  public getFiltered(fromDate:string|number, toDate:string):Observable<Result[]> {
    return this.get(`/accounts/transactions?fromDate=${fromDate}&toDate=${toDate}`)
      .map((response: Response) => {
        let dto = response.json();
        if (dto && dto.result && dto.result.length) {
          return dto.result.map(r => Result.fromDto(r));
        }
        return [ ];
      })
      .catch((error:any) => {
        return Observable.of<Result[]>(null);
      });
  }
}
