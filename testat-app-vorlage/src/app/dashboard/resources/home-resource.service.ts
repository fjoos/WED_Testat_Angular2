import {Injectable} from '@angular/core';
import {Response, Http} from "@angular/http";

import {Observable} from "rxjs";

import {TransactionInfo} from "../models";
import {ResourceBase} from "../../auth/resources/resource-base";
import {TransactionRes} from "../models/transactionRes";

@Injectable()
export class HomeResourceService extends ResourceBase {
  constructor(http: Http) {
    super(http);
  }

  public transact(model:TransactionInfo):Observable<TransactionRes>{
    return this.post('/accounts/transactions', model.toDto()).map((response: Response) => {
      let result = response.json();
      if(result){
        return TransactionInfo.fromDto(result);
      }
      return null;
    })
      .catch((error:any)=>{
      return Observable.of<TransactionInfo>(null);
      })
  }



}
