export class TransactionRes {
  constructor(public from: string,
              public target: string,
              public amount: number,
              public total: number,
              public date: Date) {
  }

  public static fromDto(data: any): TransactionRes {
    return new TransactionRes(data.from, data.target, data.amount, data.total, data.date);
  }

  toDto(): any {
    return {
      from: this.from,
      target: this.target,
      amount: this.amount,
      total: this.total,
      date: this.date
    };
  }
}
