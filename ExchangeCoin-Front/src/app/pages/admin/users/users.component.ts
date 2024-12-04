import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserAdmin, Admin } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ExchangeService } from 'src/app/services/exchange.api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  ExchangeService = inject(ExchangeService);

  auth = inject(AuthService);
  Users: UserAdmin[] = [];
  router = inject(Router);

  isAdmin: boolean | null = null;

  async ngOnInit(): Promise<void> {
    try {
      this.isAdmin = await this.ExchangeService.Admin();
      console.log('Is Admin:', this.isAdmin);

      if (this.isAdmin === false) {
        this.router.navigate(['/exchange']);
        return;
      }
    } catch (error) {
      console.error('Error en ngOnInit:', error);
    }

    try {
      this.Users = await this.ExchangeService.GetUsersForAdmin();
      console.log('Usuarios para Admin:', this.Users);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  }
}
