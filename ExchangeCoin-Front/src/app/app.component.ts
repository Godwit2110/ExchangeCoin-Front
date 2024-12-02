import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends ApiService {
  title = 'ExchangeCoin-Front';
  router = inject(Router);

  showLogoutButton(): boolean {
    const currentUrl = this.router.url;
    return currentUrl !== '/login' && currentUrl !== '/register';
  }

  showAdminButton(): boolean {
    const currentUrl = this.router.url;
    return (
      currentUrl !== '/admin/users' &&
      currentUrl !== '/admin/coins' &&
      currentUrl !== '/subscriptions' &&
      currentUrl !== '/login' &&
      currentUrl !== '/register'
    );
  }

  logout() {
    this.auth.logOut();
  }

  navigateToAdminPanel() {
    this.router.navigate(['/admin/users']);
  }
}
