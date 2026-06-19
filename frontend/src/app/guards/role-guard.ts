import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route) => {

  const router = inject(Router);

  const role = localStorage.getItem('role');

  const allowedRoles = route.data?.['roles'] as string[];

  if (allowedRoles.includes(role || '')) {
    return true;
  }

  router.navigate(['/not-allowed']);
  return false;
};