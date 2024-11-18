export interface ExchangeData {
  cointochangeName: string;
  coinchangedName: string;
  amount: number;
}

export interface ResultData extends ExchangeData {
  result: number;
}
