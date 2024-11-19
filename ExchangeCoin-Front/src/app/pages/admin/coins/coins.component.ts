import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoinForAdmin } from 'src/app/interfaces/coin';
import { Admin } from 'src/app/interfaces/user';
import { ExchangeService } from 'src/app/services/exchange.api';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss'],
})
export class CoinsComponent implements OnInit {
  ExchangeService = inject(ExchangeService);
  coins: CoinForAdmin[] = [];
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
      console.error('Error in ngOnInit:', error);
    }

    this.ExchangeService.GetCoinsForAdmin().then((Response) => {
      this.coins = Response;
    });
  }
}
