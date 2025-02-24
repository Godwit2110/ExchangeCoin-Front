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

  UserLoggedRole = '';

  async loadLoggedUser() {
    const currentUrl = this.router.url;
    console.log('curraasentUrlpep:', currentUrl);
    if (currentUrl !== '/login' && currentUrl !== '/register') {
      const user = await this.ExchangeService.GetLoggedUser();
      this.UserLoggedRole = user.role;
      console.log('pep:', this.UserLoggedRole);
    }
  }

  showLogoutButton(): boolean {
    const currentUrl = this.router.url;
    return currentUrl !== '/login' && currentUrl !== '/register';
  }

  showAdminButtonBoolean = false;

  async showAdminButton() {
    const currentUrl = this.router.url;
    console.log('curraasentUrl:', currentUrl);
    console.log('pepas:', this.UserLoggedRole);
    this.showAdminButtonBoolean =
      currentUrl !== '/login' &&
      currentUrl !== '/register' &&
      currentUrl !== '/admin/coins' &&
      this.UserLoggedRole === 'ADMIN';
    console.log('showAdminButtonBoolean:', this.showAdminButtonBoolean);
  }

  logout() {
    this.auth.logOut();
  }

  navigateToAdminPanel() {
    this.router.navigate(['/admin/coins']);
  }
}
