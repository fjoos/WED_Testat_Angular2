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
  month: String = "01";
  year : String = "2017";


  transactionsRecievedSubscription:Subscription;

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit(): void{
    this.transactionsRecievedSubscription = this.transactionService.transactionsRecieved.subscribe(
      (result) => this.transactions = result);

    this.transactionService.getFiltered(this.year + "-" + this.month + "-01T14:00:00.000Z", this.year + "-" + this.month + "-31T14:00:00.000Z");
  }

  ngOnDestroy(): void {
    if (this.transactionsRecievedSubscription) {
      this.transactionsRecievedSubscription.unsubscribe();
    }
  }

  onChangeMonth(month) {
    this.month = month;
    this.downloadData();
  }
  onChangeYear(year){
    this.year = year;
    this.downloadData();
  }

  downloadData(){
    this.transactionService.getFiltered(this.year + "-" + this.month + "-01T14:00:00.000Z", this.year + "-" + this.month + "-31T14:00:00.000Z");
  }

}
