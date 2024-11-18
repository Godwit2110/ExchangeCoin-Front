export interface coin {
  coins: Array<string>;
}

export interface CoinForAdmin {
  id: number;
  name: string;
  denomination: string;
  value: number;
}
