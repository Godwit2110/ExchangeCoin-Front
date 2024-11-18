import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExchangeRoutingModule } from './exchange-routing.module';
import { FormsModule } from '@angular/forms';
import { ExchangeComponent } from './exchange.component';

@NgModule({
  declarations: [ExchangeComponent],
  imports: [CommonModule, ExchangeRoutingModule, FormsModule],
})
export class ExchangeModule {}
