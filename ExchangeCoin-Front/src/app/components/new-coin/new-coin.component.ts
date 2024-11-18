import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CoinForAdmin } from 'src/app/interfaces/coin';

@Component({
  selector: 'app-new-coin',
  templateUrl: './new-coin.component.html',
  styleUrls: ['./new-coin.component.scss'],
})
export class NewCoinComponent {
  ApiService = inject(ApiService);
  @Output() cerrar = new EventEmitter();
  @Input() Coin: CoinForAdmin = {
    id: 0,
    name: '',
    denomination: '',
    value: 0,
  };

  async onSubmit() {
    if (this.Coin.id) this.updateCoin();
    else this.updateCoin();
  }

  async updateCoin() {
    const res = await this.ApiService.updateCoin(this.Coin);
    this.cerrar.emit();
    if (res) {
      console.log('Update successful');
    } else {
      console.log('Error updating coin');
    }
  }

  async createCoin() {
    const res = await this.ApiService.createCoin(this.Coin);
    this.cerrar.emit();
    if (res) {
      console.log('Coin Added');
    } else {
      console.log('Error creating coin');
    }
  }
}
