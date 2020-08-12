import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token = '';

  constructor(private http: HttpClient) {}

  // Get Token
  getToken(): any {
    return this.token;
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
      });
  }
}
