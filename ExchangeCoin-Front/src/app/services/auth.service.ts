import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { API } from '../constants/api';
import { LoginData, RegisterData, User, Admin } from '../interfaces/user';
import { Subscription } from '../interfaces/subscription';
import { coin } from '../interfaces/coin';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token: WritableSignal<string | null> = signal(null);
  private _user: User | null = null;
  private _subscription: Subscription | null = null;
  private _coins: coin | null = null;
  private _isAdmin: boolean | null = null;

  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      this._token.set(token);
    }
    const userData = localStorage.getItem('user');
    if (userData) {
      this._user = JSON.parse(userData);
    }
    const subscriptionData = localStorage.getItem('subscription');
    if (subscriptionData) {
      this._subscription = JSON.parse(subscriptionData);
    }
    const coinsData = localStorage.getItem('coins');
    if (coinsData) {
      this._coins = JSON.parse(coinsData);
    }
    const isAdminData = localStorage.getItem('isAdmin');
    if (isAdminData) {
      this._isAdmin = JSON.parse(isAdminData);
    }
  }

  get token(): string | null {
    return this._token();
  }

  get user(): User | null {
    return this._user;
  }

  get subscription(): Subscription | null {
    return this._subscription;
  }

  get coins(): coin | null {
    return this._coins;
  }

  get isAdmin(): boolean | null {
    return this._isAdmin;
  }

  set user(user: User | null) {
    this._user = user;
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }

  set subscription(subscription: Subscription | null) {
    this._subscription = subscription;
    if (subscription) {
      localStorage.setItem('subscription', JSON.stringify(subscription));
    } else {
      localStorage.removeItem('subscription');
    }
  }

  set coins(coins: coin | null) {
    this._coins = coins;
    if (coins) {
      localStorage.setItem('coins', JSON.stringify(coins));
    } else {
      localStorage.removeItem('coins');
    }
  }

  set isAdmin(value: boolean | null) {
    this._isAdmin = value;
    if (value !== null) {
      localStorage.setItem('isAdmin', JSON.stringify(value));
    } else {
      localStorage.removeItem('isAdmin');
    }
  }

  logOut() {
    this._token.set(null);
    this.user = null;
    this.subscription = null;
    this.coins = null;
    this.isAdmin = null;
    localStorage.removeItem('token');
    localStorage.removeItem('subscription');
    localStorage.removeItem('isAdmin');
    this.router.navigate(['/login']);
  }

  router = inject(Router);

  async login(loginData: LoginData) {
    try {
      const res = await fetch(API + 'auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      if (!res.ok) return false;
      const tokenRecibido = await res.text();
      console.log('LOGING IN', tokenRecibido);
      localStorage.setItem('token', tokenRecibido);
      this._token.set(tokenRecibido);
      return true;
    } catch {
      return false;
    }
  }

  async register(registerData: RegisterData) {
    const res = await fetch(API + 'User/Create-User', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });
    console.log('REGISTER IN', res);
    return res;
  }
}
