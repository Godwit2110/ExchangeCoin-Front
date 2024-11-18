import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { API } from '../constants/api';
import { LoginData, RegisterData } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    this.token.set(localStorage.getItem('token'));
  }
  router = inject(Router);
  token: WritableSignal<string | null> = signal(null);

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
      this.token.set(tokenRecibido);
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

  logOut() {
    this.token.set(null);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
