import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

import {HomeService} from "../services/home.service";
import {TransactionInfo} from "../models/transaction-info";
import {Account} from "../../auth/models"
import {AuthService} from "../../auth/services/auth.service";


@Component({
  selector: 'homeBoard',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],


})

export class HomeComponent implements OnInit{

  public user:Account;


  public target:string;
  public amount:number;

  public isProcessing:boolean = false;

  constructor(private autSvc:AuthService, private homeSRV:HomeService) {
  }

  ngOnInit() {
    this.user = this.autSvc.authenticatedUser;
  }


  public doTransact(f: NgForm):boolean {
    if (f.valid) {
      this.isProcessing = true;
      this.homeSRV.transact(new TransactionInfo(
        f.value.target,
        f.value.amount));
      console.log("transacted!");
    }
    return false;
  }
}
