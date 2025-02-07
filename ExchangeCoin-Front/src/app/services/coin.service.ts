import { Injectable } from '@angular/core';
import { API } from '../constants/api';
import { CoinForAdmin } from '../interfaces/coin';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CoinService extends ApiService {
  async GetCoins() {
    const res = await fetch(API + 'Coin/Get-Coins', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.auth.token(),
      },
    });
    const data = await res.json();
    return data;
  }

  async updateCoin(coin: CoinForAdmin): Promise<boolean> {
    if (!coin.id) return false;
    const res = await fetch(API + 'Coin?CoinId=' + coin.id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.auth.token,
      },
      body: JSON.stringify(coin),
    });
    return res.ok;
  }

  async createCoin(coin: CoinForAdmin): Promise<boolean> {
    if (coin.id) return false;
    const res = await fetch(API + 'Coin/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.auth.token,
      },
      body: JSON.stringify(coin),
    });
    return res.ok;
  }
}
