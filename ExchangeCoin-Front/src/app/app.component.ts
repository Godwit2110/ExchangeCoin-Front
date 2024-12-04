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

  UserLogged: UserForExchange = {
    username: '',
    trys: 2,
    role: '',
  };

  ngOnInit() {
    this.loadLoggedUser();
    this.router.events.subscribe(() => this.showAdminButton());
  }

  async loadLoggedUser() {
    const user = await this.ExchangeService.GetLoggedUser();
    this.UserLogged = user;
  }

  showLogoutButton(): boolean {
    const currentUrl = this.router.url;
    return currentUrl !== '/login' && currentUrl !== '/register';
  }

  showAdminButtonBoolean = false;

  showAdminButton() {
    const currentUrl = this.router.url;
    this.showAdminButtonBoolean =
      currentUrl !== '/login' &&
      currentUrl !== '/register' &&
      currentUrl !== '/admin/users' &&
      currentUrl !== '/admin/coins' &&
      this.UserLogged &&
      this.UserLogged.role === 'ADMIN';
  }

  logout() {
    this.auth.logOut();
  }

  navigateToAdminPanel() {
    this.router.navigate(['/admin/users']);
  }
}
