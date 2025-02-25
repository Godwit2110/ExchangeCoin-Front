import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserForExchange } from './interfaces/user';
import { ExchangeService } from './services/exchange.api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
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
  }

  navigateToAdminPanel() {
    this.router.navigate(['/admin/coins']);
  }
}
