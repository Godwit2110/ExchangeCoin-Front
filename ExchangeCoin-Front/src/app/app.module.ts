import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { CoinsComponent } from './pages/admin/coins/coins.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ExchangeComponent } from './pages/exchange/exchange.component';

@NgModule({
  declarations: [
    AppComponent,
    SubscriptionComponent,
    CoinsComponent,
    UsersComponent,
    LoginComponent,
    RegisterComponent,
    ExchangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
