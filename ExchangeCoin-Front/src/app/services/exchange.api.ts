import { Injectable, inject } from '@angular/core';

import { API } from '../constants/api';
import { ExchangeData, ResultData } from '../interfaces/exchange';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { Subscription } from '../interfaces/subscription';
import { User, UserAdmin } from '../interfaces/user';
import { CoinForAdmin } from '../interfaces/coin';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService extends ApiService {
  async Exchange(ExchangeData: ExchangeData): Promise<ResultData> {
    const url = API + 'Coin/Exchange';
    const token = this.auth.token();

    const RequestOptions: RequestInit = {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(ExchangeData),
    };

    const res = await fetch(url, RequestOptions);
    console.log('SerchingName', res);

    const data = await res.json();

    console.log(data);

    return await data;
  }

  async GetSubscription(): Promise<Subscription> {
    const url = API + 'User/Get-Subscription';
    const token = this.auth.token();

    const RequestOptions: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    const res = await fetch(url, RequestOptions);
    console.log('SerchingName', res);

    const data = await res.json();

    console.log(data);

    return await data;
  }

  async GetLoggedUser() {
    const url = API + 'User/Get-Logged-User';
    const token = this.auth.token();

    const RequestOptions: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    const res = await fetch(url, RequestOptions);
    console.log('SerchingName', res);

    const data = await res.json();

    console.log(data);

    return await data;
  }

  async GetMoneda() {
    const url = API + 'Moneda/Get-Lista-Monedas';
    const token = this.auth.token();

    const RequestOptions: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        // otras cabeceras si es necesario
      },
    };

    const res = await fetch(url, RequestOptions);
    console.log('SerchingCoins', res);

    const data = await res.json();

    console.log(data);

    return await data;
  }
  async ChangeSubscription(id: number): Promise<User> {
    const url = API + 'User/Change-Subscription?idSubs=' + id;
    const token = this.auth.token();

    const RequestOptions: RequestInit = {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    const res = await fetch(url, RequestOptions);
    console.log('Changing Subscription', res);

    const data = await res.json();

    console.log(data);

    return await data;
  }
  async GetUsersForAdmin(): Promise<Array<UserAdmin>> {
    const url = API + 'User/Get-User-For-Admin';
    const token = this.auth.token();

    const RequestOptions: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    const res = await fetch(url, RequestOptions);
    console.log('SerchingUsers', res);

    const data = await res.json();

    console.log(data);

    return await data;
  }

  async GetCoinsForAdmin(): Promise<Array<CoinForAdmin>> {
    const url = API + 'Moneda/Get-Coins-For-Admin';
    const token = this.auth.token();

    const RequestOptions: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    const res = await fetch(url, RequestOptions);
    console.log('SerchingCoins', res);

    const data = await res.json();

    console.log(data);

    return await data;
  }
}
