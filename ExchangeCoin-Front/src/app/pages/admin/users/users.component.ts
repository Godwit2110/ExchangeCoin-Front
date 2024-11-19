import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserAdmin, Admin } from 'src/app/interfaces/user';
import { ExchangeService } from 'src/app/services/exchange.api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  ExchangeService = inject(ExchangeService);

  UserForAdmin: UserAdmin = {
    username: '',
    email: '',
    role: '',
    subsId: 0,
  };

  Users: UserAdmin[] = [];
  router = inject(Router);

  access: Admin = {
    admin: true,
  };

  async ngOnInit(): Promise<void> {
    try {
      this.access = await this.ExchangeService.Admin();
      console.log(this.access);

      if (this.access.admin === false) {
        this.router.navigate(['/exchange']);
      }
    } catch (error) {
      console.error('Error en ngOnInit:', error);
    }
    this.ExchangeService.GetUsersForAdmin().then((respond) => {
      this.Users = respond;
    });
  }
}
