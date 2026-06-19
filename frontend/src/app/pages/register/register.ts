import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  username = '';
  email = '';
  password = '';
  role = 'operator';

  successMessage = '';
  errorMessage = '';

  private authService =
    inject(AuthService);

  private router =
    inject(Router);

  register() {

    this.successMessage = '';
    this.errorMessage = '';

    if (!this.username.trim()) {

      this.errorMessage =
        'Username is required';

      return;

    }

    if (!this.email.trim()) {

      this.errorMessage =
        'Email is required';

      return;

    }

    if (this.password.length < 8) {

      this.errorMessage =
        'Password must be at least 8 characters long';

      return;

    }

    if (this.password.length > 50) {

      this.errorMessage =
        'Password cannot exceed 50 characters';

      return;

    }

    const payload = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.authService
      .register(payload)
      .subscribe({
        next: () => {

          this.successMessage =
            'User created successfully';

          setTimeout(() => {

            alert(
              'User created successfully. Please login.'
            );

            this.router.navigate([
              '/login'
            ]);

          }, 500);

        },

        error: (error) => {

          if (
            Array.isArray(
              error?.error?.detail
            )
          ) {

            this.errorMessage =
              error.error.detail
                .map(
                  (
                    item: any
                  ) => item.msg
                )
                .join(', ');

          } else {

            this.errorMessage =
              error?.error?.detail ||
              'Registration failed';

          }

        }
      });

  }

}