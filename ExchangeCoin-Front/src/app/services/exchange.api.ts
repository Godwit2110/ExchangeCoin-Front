import { Injectable, inject } from '@angular/core';
import { API } from '../constants/api';
import { ExchangeData, ResultData } from '../interfaces/exchange';
import { ApiService } from './api.service';
import { Subscription } from '../interfaces/subscription';
import { User, UserAdmin } from '../interfaces/user';
import { CoinForAdmin } from '../interfaces/coin';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService extends ApiService {
  private cachedUsersForAdmin: UserAdmin[] | null = null;
  private cachedCoinsForAdmin: CoinForAdmin[] | null = null;

  async Exchange(ExchangeData: ExchangeData): Promise<ResultData> {
    const url = API + 'Coin/Exchange';
    const token = this.auth.token;

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

    return data;
  }

  async GetSubscription(): Promise<Subscription> {
    if (this.auth.subscription) {
      return this.auth.subscription;
    }

    const url = API + 'User/Get-Subscription';
    const token = this.auth.token;

    if (!token) {
      throw new Error('not autorized');
    }

    const RequestOptions: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    const res = await fetch(url, RequestOptions);
    console.log('Serching Subscription', res);

    if (res.status === 401) {
      this.auth.logOut();
      throw new Error('not autorized');
    }

    const data = await res.json();
    console.log(data);

    this.auth.subscription = data;

    return data;
  }

  async GetLoggedUser(): Promise<User> {
    if (this.auth.user) {
      return this.auth.user;
    }

    const url = API + 'User/Get-Logged-User';
    const token = this.auth.token;

    if (!token) {
      throw new Error('not autorized');
    }

    const RequestOptions: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    const res = await fetch(url, RequestOptions);

    if (res.status === 401) {
      this.auth.logOut();
      throw new Error('not autorized');
    }

    const data = await res.json();

    this.auth.user = data;

    return data;
  }

  async GetCoins() {
    if (this.auth.coins) {
      return this.auth.coins;
    }
    const url = API + 'Coin/GetCoinList';
    const token = this.auth.token;

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

    this.auth.coins = data;

    return data;
  }
  async ChangeSubscription(id: number): Promise<User> {
    const url = API + 'User/Change-Subscription?idSubs=' + id;
    const token = this.auth.token;

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

    this.auth.subscription = data.subscription;

    return data;
  }
  async GetUsersForAdmin(): Promise<UserAdmin[]> {
    if (this.cachedUsersForAdmin) {
      return this.cachedUsersForAdmin;
    }

    const res = await this.getAuth('User/Get-User-For-Admin');

    if (res.status === 401) {
      this.auth.logOut();
      throw new Error('No autorizado');
    }

    const data: UserAdmin[] = await res.json();

    this.cachedUsersForAdmin = data;
    return data;
  }

  async GetCoinsForAdmin(): Promise<CoinForAdmin[]> {
    if (this.cachedCoinsForAdmin) {
      return this.cachedCoinsForAdmin;
    }

    const res = await this.getAuth('Coin/GetCoinsForAdmin');

    if (res.status === 401) {
      this.auth.logOut();
      throw new Error('No autorizado');
    }

    const data: CoinForAdmin[] = await res.json();

    this.cachedCoinsForAdmin = data;
    return data;
  }
}
