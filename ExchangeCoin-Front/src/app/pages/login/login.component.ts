import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  loginData: LoginData = {
    name: '',
    password: '',
  };

  login() {
    this.authService.login(this.loginData).then((res) => {
      if (res) this.router.navigate(['/exchange']);
      else console.log('Error autenticando');
    });
    //
  }
}
