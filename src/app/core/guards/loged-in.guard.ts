import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const logedInGuard: CanActivateFn = () => {
  const router = inject(Router);

  const raw  = localStorage.getItem('authUser');
  const user = raw ? JSON.parse(raw) : null;

  if (user?.email) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
