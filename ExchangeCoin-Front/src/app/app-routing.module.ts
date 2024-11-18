import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { not_loguser } from './guards/Not-LogUser';
import { loguserGuard } from './guards/LogUser.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [not_loguser],
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    canActivate: [not_loguser],
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'exchange',
    canActivate: [not_loguser],
    loadChildren: () =>
      import('./pages/exchange/exchange.module').then((m) => m.ExchangeModule),
  },
  {
    path: 'subscription',
    canActivate: [not_loguser],
    loadChildren: () =>
      import('./pages/subscription/subscription.module').then(
        (m) => m.SubscriptionModule
      ),
  },
  {
    path: 'admin/users',
    canActivate: [not_loguser],
    loadChildren: () =>
      import('./pages/admin/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'admin/Monedas',
    canActivate: [not_loguser],
    loadChildren: () =>
      import('./pages/admin/coins/coins.module').then((m) => m.CoinsModule),
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
