import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const not_loguser: CanActivateFn = async (route, state) => {
  const auth = inject(AuthService);
  if (auth.token()) {
    const router = inject(Router);
    router.navigate(['exchange']);
    return false;
  }
  return true;
};
