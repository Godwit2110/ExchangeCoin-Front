import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserForExchange } from './interfaces/user';
import { ExchangeService } from './services/exchange.api';
import { CoinService } from './services/coin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cacheKeyCoin = 'GetCoins';
  cacheKeySub = 'Get-Subscription';
  cacheKeyUser = 'Get-Logged-User';
  title = 'ExchangeCoin-Front';
  router = inject(Router);
  ExchangeService = inject(ExchangeService);
  auth = inject(AuthService);

  showLogoutButton(): boolean {
    const currentUrl = this.router.url;
    return currentUrl !== '/login' && currentUrl !== '/register';
  }

  logout() {
    this.auth.logOut();
    localStorage.removeItem(this.cacheKeyCoin);
    localStorage.removeItem(this.cacheKeySub);
    localStorage.removeItem(this.cacheKeyUser);
  }

  navigateToAdminPanel() {
    this.router.navigate(['/admin/coins']);
  }
}
