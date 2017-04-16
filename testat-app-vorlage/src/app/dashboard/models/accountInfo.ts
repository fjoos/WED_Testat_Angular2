export class AccountInfo {
  constructor(
    public accountNr: string,
    public amount: number,
  ) {
  }

  public static fromDto(data: any): AccountInfo {
    return new AccountInfo(data.accountNr, data.amount);
  }

  toDto(): any {
    return {
      accountNr: this.accountNr,
      amount: this.amount,
    };
  }
}
