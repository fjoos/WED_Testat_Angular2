import {Injectable} from '@angular/core';
import {Response, Http} from "@angular/http";
import {Observable} from "rxjs";

import {TransactionInfo, TransactionRes, AccountInfo, Result} from "../models";
import {ResourceBase} from "../../auth/resources/resource-base";

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
      return Observable.of<TransactionRes>(null);
      })
  }

  public getLastTransacts():Observable<Result[]> {
    return this.get(`/accounts/transactions?fromDate=2016-05-11T02:00:00.000Z&toDate=2016-12-11T02:00:00.000Z&count=3`)
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

  public getUserInfo():Observable<AccountInfo>{
    return this.get('/accounts/').map((response: Response) => {
      let dto = response.json();
      if(dto){
        return AccountInfo.fromDto(dto);
      }
      return null;
    })
      .catch((error:any) => {
      return Observable.of<AccountInfo>(null);
      });
  }

}
