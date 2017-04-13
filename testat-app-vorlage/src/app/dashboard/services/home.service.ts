import {Injectable, EventEmitter} from '@angular/core';

import {TransactionInfo} from "../models";
import {HomeResourceService} from "../resources";


@Injectable()
export class HomeService {

  constructor(private resource:HomeResourceService) {

  }


  public transact(transactModel: TransactionInfo):void{
    this.resource.transact(transactModel);
  }


}
