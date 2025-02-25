import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExchangeData, ResultData } from 'src/app/interfaces/exchange';
import { Subscription } from 'src/app/interfaces/subscription';
import { UserForExchange } from 'src/app/interfaces/user';
import { ExchangeService } from 'src/app/services/exchange.api';
import { CoinService } from 'src/app/services/coin.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent implements OnInit {
  ExchangeService = inject(ExchangeService);
  CoinService = inject(CoinService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  ExchangeData: ExchangeData = {
    cointochangeName: '',
    coinchangedName: '',
    amount: 0,
  };

  ResultData: ResultData = {
    cointochangeName: '',
    coinchangedName: '',
    amount: 0,
    result: 0,
  };

  UserLogged: UserForExchange = {
    username: '',
    trys: 2,
    role: '',
  };

  ActiveSubscription: Subscription = {
    name: '',
    id: 0,
    maxTrys: 0,
  };

  TrysRemaining = 0;

  UserRole = '';

  CoinList = [];

  ngOnInit(): void {
    Promise.all([
      this.ExchangeService.getSub(),
      this.ExchangeService.GetLoggedUser(),
    ]).then(([value, User]) => {
      this.UserRole = User.role;
      if (value) {
        this.ActiveSubscription = value;
      }
      if (User) {
        this.UserLogged = User;
        this.TrysRemaining =
          this.ActiveSubscription.maxTrys - this.UserLogged.trys;
      }

      this.CoinService.GetCoins().then((list) => {
        this.CoinList = list.coins;
      });
    });
  }

  Exchange() {
    this.ExchangeService.Exchange(this.ExchangeData).then(
      (respond) => (this.ResultData = respond)
    );
  }

  navigateToAdminPanel() {
    this.router.navigate(['/admin/coins']);
  }
}
