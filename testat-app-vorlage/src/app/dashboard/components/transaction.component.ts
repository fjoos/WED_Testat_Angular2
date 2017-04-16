import {Component, OnDestroy, OnInit} from '@angular/core';

import {Result} from "../models/Result";
import {TransactionService} from "../services/transaction.service";
import {Subscription} from 'rxjs';

@Component({
  selector: 'transaction',
  templateUrl: 'transaction.component.html',
  styleUrls: ['transaction.component.scss']
})

export class TransactionComponent implements OnInit, OnDestroy {
  result: Result;
  transactions: Result[] = [];
  fromDate: Date;
  toDate: Date;


  transactionsRecievedSubscription:Subscription;

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit(): void{
    this.transactionsRecievedSubscription = this.transactionService.transactionsRecieved.subscribe(
      (result) => this.transactions = result);

    this.transactionService.getFiltered("2016-01-10T14:00:00.000Z", "2016-12-10T14:00:00.000Z");
  }

  ngOnDestroy(): void {
    if (this.transactionsRecievedSubscription) {
      this.transactionsRecievedSubscription.unsubscribe();
    }
  }
}
