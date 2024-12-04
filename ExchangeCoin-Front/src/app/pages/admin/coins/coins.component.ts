import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoinForAdmin } from 'src/app/interfaces/coin';
import { AuthService } from 'src/app/services/auth.service';
import { ExchangeService } from 'src/app/services/exchange.api';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss'],
})
export class CoinsComponent implements OnInit {
  ExchangeService = inject(ExchangeService);
  auth = inject(AuthService);
  coins: CoinForAdmin[] = [];
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
      this.coins = await this.ExchangeService.GetCoinsForAdmin();
      console.log('Coins para Admin:', this.coins);
    } catch (error) {
      console.error('Error al obtener coins:', error);
    }
  }
}
