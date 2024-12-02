// register.component.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterData } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);

  registerData: RegisterData = {
    Username: '',
    Email: '',
    Password: '',
  };

  alertMessage: string = '';
  alertType: 'success' | 'error' = 'error';

  async register() {
    if (
      this.registerData.Username === '' ||
      this.registerData.Email === '' ||
      this.registerData.Password === ''
    ) {
      this.showAlert('Please fill in all required fields.', 'error');
      return;
    }

    if (this.registerData.Password.length < 4) {
      this.showAlert('Password must be at least 4 characters long.', 'error');
      return;
    }

    const res = await this.authService.register(this.registerData);
    if (res.ok) {
      this.showAlert(
        'Registration successful! Redirecting to login...',
        'success'
      );
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    } else {
      this.showAlert('Registration failed. Please try again.', 'error');
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
