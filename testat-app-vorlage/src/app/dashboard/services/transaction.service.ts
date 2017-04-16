import {Injectable, EventEmitter} from '@angular/core';

import {TransactionResourceService} from "../resources";
import {Result} from "../models";


@Injectable()
export class TransactionService {
  transactionsRecieved: EventEmitter<Result[]>  = new EventEmitter<Result[]>();

  constructor(private resource:TransactionResourceService) {

  }

  public getFiltered(fromDate:string|number, toDate:string):void {
    this.resource.getFiltered(fromDate, toDate).subscribe((data) => this.transactionsRecieved.emit(data))
  }


}
