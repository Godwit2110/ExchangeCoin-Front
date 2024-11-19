import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExchangeData, ResultData } from 'src/app/interfaces/exchange';
import { Subscription } from 'src/app/interfaces/subscription';
import { UserForExchange } from 'src/app/interfaces/user';
import { ExchangeService } from 'src/app/services/exchange.api';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent implements OnInit {
  ExchangeService = inject(ExchangeService);
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

  CoinList = [];

  ngOnInit(): void {
    Promise.all([
      this.ExchangeService.GetSubscription(),
      this.ExchangeService.GetLoggedUser(),
    ]).then(([value, User]) => {
      if (value) {
        this.ActiveSubscription = value;
        console.log('ActiveSubscription:', this.ActiveSubscription);
      }
      if (User) {
        this.UserLogged = User;
        console.log('UserLogged:', this.UserLogged);
      }
      if (this.ActiveSubscription.maxTrys && this.UserLogged.trys) {
        this.TrysRemaining =
          this.ActiveSubscription.maxTrys - this.UserLogged.trys;
      } else {
        this.TrysRemaining = 0;
      }
      console.log('trysRemaining:', this.TrysRemaining);

      this.ExchangeService.GetCoins().then((list) => {
        this.CoinList = list.coins;
        console.log('CoinList:', this.CoinList);
      });
    });
  }

  Exchange() {
    this.ExchangeService.Exchange(this.ExchangeData).then(
      (respond) => (this.ResultData = respond)
    );
    Promise.all([
      this.ExchangeService.GetSubscription(),
      this.ExchangeService.GetLoggedUser(),
    ]).then(([value, User]) => {
      if (value) {
        this.ActiveSubscription = value;
        console.log('ActiveSubscription:', this.ActiveSubscription);
      }
      if (User) {
        this.UserLogged = User;
        console.log('UserLogged:', this.UserLogged);
      }
      if (
        this.ActiveSubscription.maxTrys != null &&
        this.UserLogged.trys != null
      ) {
        this.TrysRemaining =
          this.ActiveSubscription.maxTrys - this.UserLogged.trys;
      } else {
        this.TrysRemaining = 0;
      }
      console.log('maxTrys:', this.ActiveSubscription.maxTrys);
      console.log('trys:', this.UserLogged.trys);

      this.ExchangeService.GetCoins().then((list) => {
        this.CoinList = list.coins;
        console.log('CoinList:', this.CoinList);
      });
    });
  }
}
