import {
  Injectable,
  WritableSignal,
  inject,
  signal,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { API } from '../constants/api';
import { LoginData, RegisterData } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  token: WritableSignal<string | null> = signal(null);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.token.set(localStorage.getItem('token'));
    }
  }

  async login(loginData: LoginData): Promise<boolean> {
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
    try {
      const res = await fetch(API + 'User/Create-User', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });
      console.log('REGISTER IN', res);
      return res;
    } catch (error) {
      console.error('REGISTER IN', error);
      throw error;
    }
  }
  logOut(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.token.set(null);
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }
}
