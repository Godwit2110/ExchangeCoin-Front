import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CoinService } from 'src/app/services/coin.service';
import { CoinForAdmin } from 'src/app/interfaces/coin';

@Component({
  selector: 'app-new-coin',
  templateUrl: './new-coin.component.html',
  styleUrls: ['./new-coin.component.scss'],
})
export class NewCoinComponent {
  CoinService = inject(CoinService);
  @Output() close = new EventEmitter();
  @Input() Coin: CoinForAdmin = {
    id: 0,
    name: '',
    denomination: '',
    value: 0,
  };

  async onSubmit() {
    if (this.Coin.id) this.updateCoin();
    else this.createCoin();
  }

  async updateCoin() {
    const res = await this.CoinService.updateCoin(this.Coin);
    this.close.emit();
    if (res) {
      console.log('Update successful');
    } else {
      console.log('Error updating coin');
    }
  }

  async createCoin() {
    const res = await this.CoinService.createCoin(this.Coin);
    this.close.emit();
    if (res) {
      console.log('Coin Added');
    } else {
      console.log('Error creating coin');
    }
  }
}
