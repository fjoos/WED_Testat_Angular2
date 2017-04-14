export class Result {
  constructor(public from: string,
              public target: string,
              public amount: string,
              public total: string,
              public date: Date) {
  }

  public static fromDto(data: any): Result {
    return new Result(data.from, data.target, data.amount, data.total, new Date(data.date));
  }
}
