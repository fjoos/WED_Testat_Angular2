import {Injectable, EventEmitter} from '@angular/core';

import {TransactionInfo, AccountInfo, Result} from "../models";
import {HomeResourceService} from "../resources";


@Injectable()
export class HomeService {

  transactionsRecieved: EventEmitter<Result[]>  = new EventEmitter<Result[]>();

  authenticatedUserChange: EventEmitter<AccountInfo> = new EventEmitter<AccountInfo>();


  constructor(private resource:HomeResourceService) {
  }


  public transact(transactModel: TransactionInfo):void{
    this.resource.transact(transactModel).subscribe();
  }

  public lastTransactions():void{
    this.resource.getLastTransacts().subscribe((data) => this.transactionsRecieved.emit(data));
  }

  public authenticatedUser():void {
    this.resource.getUserInfo().subscribe((data) => this.authenticatedUserChange.emit(data));
  }


}
