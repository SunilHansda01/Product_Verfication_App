import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode'; // Import the lightweight decoder

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private apiUrl = 'http://localhost:8000';

  login(username: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http.post(
      `${this.apiUrl}/auth/login`,
      body.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access_token');
    }
  }

  getToken() {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return localStorage.getItem('access_token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  // Decodes JWT payload properties safely
  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      // Decode the token structure
      const decoded: any = jwtDecode(token);

      // Adjust property path ('role', 'user_role', etc.) to match the JWT payload architecture
      return decoded.role || decoded.user_role || null;
    } catch (error) {
      console.error('Failed to decode security token:', error);
      return null;
    }
  }

  register(user: any) {
    return this.http.post(
      `${this.apiUrl}/auth/create-user`,
      user
    );
  }
}