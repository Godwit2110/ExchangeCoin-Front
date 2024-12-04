import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { API } from '../constants/api';
import { CoinForAdmin } from '../interfaces/coin';
import { Admin } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  auth = inject(AuthService);

  constructor() {}

  async getAuth(endpoint: string) {
    const res = await fetch(API + endpoint, {
      headers: {
        Authorization: 'Bearer ' + this.auth.token,
      },
    });
    if (res.status === 401) {
      this.auth.logOut();
    }
    return res;
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

  async Admin(): Promise<boolean> {
    if (this.auth.isAdmin !== null) {
      return this.auth.isAdmin ?? false;
    }

    const res = await fetch(API + 'auth', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.auth.token,
      },
    });

    if (res.status === 401) {
      this.auth.logOut();
      throw new Error('No autorizado');
    }

    const data = await res.json();

    // Asegúrate de que la respuesta de la API tenga la propiedad 'admin' como booleano
    this.auth.isAdmin = data.admin;

    return this.auth.isAdmin ?? false;
  }
}
