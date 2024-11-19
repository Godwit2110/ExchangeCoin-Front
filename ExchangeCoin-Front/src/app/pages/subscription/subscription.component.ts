import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ExchangeService } from 'src/app/services/exchange.api';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent {
  ExchangeService = inject(ExchangeService);
  router = inject(Router);

  ChangeSubscription(id: number) {
    this.ExchangeService.ChangeSubscription(id);
    this.router.navigate(['/exchange']);
  }
}
