import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

import {HomeService} from "../services/home.service";
import {TransactionInfo, Result, AccountInfo} from "../models";
import {Subscription} from "rxjs";
import {after} from "selenium-webdriver/testing";

@Component({
  selector: 'homeBoard',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],


})

export class HomeComponent implements OnInit, OnDestroy {

  user: AccountInfo;
  result: Result;
  transactions: Result[] = [];

  transactionsRecievedSubscription:Subscription;
  authenticatedUserChangeSubscription:Subscription;

  constructor(private homeSRV:HomeService) {
  }

  ngOnInit() {
    this.transactionsRecievedSubscription = this.homeSRV.transactionsRecieved.subscribe(
      (result) => this.transactions = result);

    this.authenticatedUserChangeSubscription = this.homeSRV.authenticatedUserChange.subscribe(
      (user) => this.user = user);

     this.homeSRV.authenticatedUser();
     this.homeSRV.lastTransactions();
  }


  public doTransact(f: NgForm):boolean {
    if (f.valid) {
      this.homeSRV.transact(new TransactionInfo(
        f.value.target,
        f.value.amount)
      );
      console.log("transacted!");
    }
    return false;
  }

  ngOnDestroy(): void {
    if (this.transactionsRecievedSubscription) {
      this.transactionsRecievedSubscription.unsubscribe();
    }

    if (this.authenticatedUserChangeSubscription) {
      this.authenticatedUserChangeSubscription.unsubscribe();
    }

  }

}
