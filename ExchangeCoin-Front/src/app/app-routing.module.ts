import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { CoinsComponent } from './pages/admin/coins/coins.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { RegisterComponent } from './pages/register/register.component';
import { ExchangeComponent } from './pages/exchange/exchange.component';
import { NewCoinComponent } from './components/new-coin/new-coin.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'exchange', component: ExchangeComponent },
  { path: 'admin/users', component: UsersComponent },
  { path: 'admin/coins', component: CoinsComponent },
  { path: 'new-coin', component: NewCoinComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
