import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoinsRoutingModule } from './coins-routing.module';
import { CoinsComponent } from './coins.component';
import { NewCoinComponent } from '../../../components/new-coin/new-coin.component';

@NgModule({
  declarations: [CoinsComponent],
  imports: [CommonModule, CoinsRoutingModule, NewCoinComponent],
})
export class CoinsModule {}
