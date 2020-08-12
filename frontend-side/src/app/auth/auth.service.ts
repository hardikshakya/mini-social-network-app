import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token = '';
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  // Get Token
  getToken(): any {
    return this.token;
  }

  getIsAuth(): any {
    return this.isAuthenticated;
  }

  // Get status that user authenticated or not
  getAuthStatusListener(): any {
    return this.authStatusListener.asObservable();
  }

  // SignUp-Create User
  createUser(email: string, password: string): any {
    const authData: AuthData = { email, password };
    this.http
      .post('http://localhost:3000/api/v1/user/signup', authData)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  // Login User
  login(email: string, password: string): any {
    const authData: AuthData = { email, password };
    this.http
      .post<{ message: string; token: string; code: number }>(
        'http://localhost:3000/api/v1/user/login',
        authData
      )
      .subscribe((responseData) => {
        const token = responseData.token;
        this.token = token;
        if (token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(['/']);
        }
      });
  }

  // Logout User
  logout(): any {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }
}
