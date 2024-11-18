import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginData } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  loginData: LoginData = {
    name: '',
    password: '',
  };

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const username = params['username'];
      const password = params['password'];
      if (username && password) {
        this.loginData.name = username;
        this.loginData.password = password;
        this.login();
      }
    });
  }

  login() {
    this.authService.login(this.loginData).then((res) => {
      if (res) this.router.navigate(['/exchange']);
      else console.log('Error autenticando');
    });
  }
}
