import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);

  const raw  = localStorage.getItem('authUser');
  const user = raw ? JSON.parse(raw) : null;

  if (user?.email === 'admin@admin.es') {
    return true;
  }

  return router.createUrlTree(['/']);
};