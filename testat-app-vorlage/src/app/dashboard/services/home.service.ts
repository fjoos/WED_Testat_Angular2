import {Injectable, EventEmitter} from '@angular/core';

import {TransactionInfo} from "../models";
import {HomeResourceService} from "../resources";
import {AccountInfo} from "../models/accountInfo";
import {SecurityTokenStore} from "../../auth/services/credential-management/security-token-store";


@Injectable()
export class HomeService {

  public get authenticatedUser():AccountInfo {
    return this.authUser;
  }

  private authUser:AccountInfo = null;


  constructor(private resource:HomeResourceService) {

  }


  public transact(transactModel: TransactionInfo):void{
    this.resource.transact(transactModel);
  }


}
