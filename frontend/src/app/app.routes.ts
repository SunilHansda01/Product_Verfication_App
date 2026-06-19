import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

import { Dashboard } from './pages/dashboard/dashboard';

import { UploadProducts } from './pages/upload-products/upload-products';
import { VerifyProduct } from './pages/verify-product/verify-product';
import { Reports } from './pages/reports/reports';
import { loginGuard } from './guards/login-guard';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login,
    canActivate: [loginGuard]
  },

  {
    path: 'register',
    component: Register
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'verify',
        pathMatch: 'full'
      },

      {
        path: 'upload-products',
        component: UploadProducts
      },

      {
        path: 'verify',
        component: VerifyProduct
      },

      {
        path: 'reports',
        component: Reports
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'login',
  }
];