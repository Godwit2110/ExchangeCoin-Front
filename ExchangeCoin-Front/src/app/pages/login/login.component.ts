// login.component.ts
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

  alertMessage: string = '';
  alertType: 'success' | 'error' = 'error';

  async login() {
    if (this.loginData.name === '' || this.loginData.password === '') {
      this.showAlert('Please fill in all required fields.', 'error');
      return;
    }

    const res = await this.authService.login(this.loginData);
    if (res) {
      this.showAlert('Login successful!', 'success');
      this.router.navigate(['/exchange']);
    } else {
      this.showAlert('Invalid username or password.', 'error');
    }
  }

  showAlert(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    // Hide the alert after 5 seconds
    setTimeout(() => {
      this.alertMessage = '';
    }, 5000);
  }
}
