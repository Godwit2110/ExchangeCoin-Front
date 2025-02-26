import { Injectable } from '@angular/core';
import { API } from '../constants/api';
import { ExchangeData, ResultData } from '../interfaces/exchange';
import { ApiService } from './api.service';
import { User } from '../interfaces/user';
import { CoinForAdmin } from '../interfaces/coin';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService extends ApiService {
  private cacheKeySub = 'Get-Subscription';
  private cacheKeyUser = 'Get-Logged-User';

  async Exchange(ExchangeData: ExchangeData): Promise<ResultData> {
    const res = await fetch(API + 'Coin/Exchange', {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + this.auth.token(),
        'Content-type': 'application/json',
      },
      body: JSON.stringify(ExchangeData),
    });
    const data: ResultData = await res.json();

    return data;
  }

  async getSub() {
    const cachedData = localStorage.getItem(this.cacheKeySub);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const res = await fetch(API + 'User/Get-Subscription', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.auth.token(),
      },
    });
    if (!res.ok) {
      throw new Error('Unauthorized');
    }
    const response = await res.json();
    localStorage.setItem(this.cacheKeySub, JSON.stringify(response));
    return response;
  }

  async ChangeSubscription(id: number): Promise<User> {
    const res = await fetch(API + 'User/Change-Subscription?idSubs=' + id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.auth.token(),
      },
      body: JSON.stringify(id),
    });
    const data: User = await res.json();
    localStorage.removeItem(this.cacheKeySub);
    return data;
  }

  async GetCoinsForAdmin(): Promise<CoinForAdmin[]> {
    const res = await this.getAuth('Coin/GetCoinsForAdmin');

    if (res.status === 401) {
      this.auth.logOut();
      throw new Error('No autorizado');
    }

    const data: CoinForAdmin[] = await res.json();
    return data;
  }

  async GetLoggedUser(): Promise<{
    role: string;
    trys: number;
    username: string;
  }> {
    const cachedData = localStorage.getItem(this.cacheKeyUser);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const res = await this.getAuth('User/Get-Logged-User');
    const resJson = await res.json();

    const { role, trys, username } = resJson;
    localStorage.setItem(
      this.cacheKeyUser,
      JSON.stringify({ role, trys, username })
    );
    return { role, trys, username };
  }

  async isAdmin() {
    try {
      const { role } = await this.GetLoggedUser();
      if (role === 'ADMIN') {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error al verificar el rol de administrador:', error);
      return false;
    }
  }
}
