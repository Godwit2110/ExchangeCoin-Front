import { Injectable, inject } from '@angular/core';
import { API } from '../constants/api';
import { ExchangeData, ResultData } from '../interfaces/exchange';
import { ApiService } from './api.service';
import { Subscription } from '../interfaces/subscription';
import { UserForExchange } from '../interfaces/user';
import { User, UserAdmin } from '../interfaces/user';
import { CoinForAdmin } from '../interfaces/coin';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService extends ApiService {
  async Exchange(ExchangeData: ExchangeData): Promise<ResultData> {
    const res = await fetch(API + 'Coin/Exchange', {
      method: 'POST',
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
    const res = await fetch(API + 'User/Get-Subscription', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.auth.token,
      },
    });
    if (!res.ok) {
      throw new Error('Unauthorized');
    }
    const response = await res.json();
    return response;
  }

  async ChangeSubscription(id: number): Promise<User> {
    const res = await fetch(API + 'User/Change-Subscription?idSubs=', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.auth.token(),
      },
      body: JSON.stringify(id),
    });
    const data: User = await res.json();
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

  async GetLoggedUser() {
    const res = await this.getAuth('User/Get-Logged-User');
    const resJson = await res.json();

    const role = resJson.role;
    return role;

    const tries = resJson.trys;
    return tries;
  }

  async isAdmin() {
    try {
      const role = await this.GetLoggedUser(); // Get the role from the previous method
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
