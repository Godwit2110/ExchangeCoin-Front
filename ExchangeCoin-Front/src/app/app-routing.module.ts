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
    path: 'convertir',
    canActivate: [not_loguser],
    loadChildren: () =>
      import('./pages/convertir/convertir.module').then(
        (m) => m.ConvertirModule
      ),
  },
  {
    path: 'suscripciones',
    canActivate: [not_loguser],
    loadChildren: () =>
      import('./pages/suscripciones/suscripciones.module').then(
        (m) => m.SuscripcionesModule
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
      import('./pages/admin/monedas/monedas.module').then(
        (m) => m.MonedasModule
      ),
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
