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

  register() {
    this.authService.register(this.registerData).then((res) => {
      if (res.ok) this.router.navigate(['/login']);
      else console.log('Error registering');
    });
  }
}
