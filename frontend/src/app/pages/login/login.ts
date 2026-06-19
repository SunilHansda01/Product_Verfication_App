import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  username = '';
  password = '';
  errorMessage = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    this.errorMessage = '';

    this.authService
      .login(this.username, this.password)
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('access_token', response.access_token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          // Extract error details from FastAPI (usually err.error?.detail)
          const errorDetail = err?.error?.detail;
          let messageString = '';

          if (typeof errorDetail === 'string') {
            messageString = errorDetail.toLowerCase();
          } else if (Array.isArray(errorDetail) && errorDetail.length > 0) {
            // Fallback if detail is an validation array
            messageString = JSON.stringify(errorDetail).toLowerCase();
          }

          // 1. Check if backend indicates the user account doesn't exist
          if (
            err.status === 404 || 
            messageString.includes('not found') || 
            messageString.includes('exist') || 
            messageString.includes('not registered')
          ) {
            this.errorMessage = 'This user is not registered. Please create an account below.';
          } 
          // 2. Default fallback for standard wrong passwords or standard 401s
          else {
            this.errorMessage = 'Invalid username or password.';
          }
        }
      });
  }
}