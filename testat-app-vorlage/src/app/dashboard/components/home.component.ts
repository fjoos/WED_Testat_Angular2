import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

import {HomeService} from "../services/home.service";
import {TransactionInfo} from "../models/transaction-info";


@Component({
  selector: 'homeBoard',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})

export class HomeComponent{
  public target:string;
  public amount:number;

  public isProcessing:boolean = false;
  constructor(private dashSRV:HomeService) {
  }

  public doTransact(f: NgForm):boolean {
    if (f.valid) {
      this.isProcessing = true;
      this.dashSRV.transact(new TransactionInfo(
        f.value.target,
        f.value.amount));
    }
    return false;
  }
}
