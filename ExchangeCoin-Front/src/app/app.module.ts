import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { CoinsComponent } from './pages/admin/coins/coins.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ExchangeComponent } from './pages/exchange/exchange.component';
import { NewCoinComponent } from './components/new-coin/new-coin.component';

@NgModule({
  declarations: [
    AppComponent,
    SubscriptionComponent,
    CoinsComponent,
    LoginComponent,
    RegisterComponent,
    ExchangeComponent,
    NewCoinComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
