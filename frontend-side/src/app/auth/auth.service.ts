import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  // SignUp-Create User
  createUser(email: string, password: string): any {
    const authData: AuthData = { email, password };
    this.http
      .post('http://localhost:3000/api/v1/user/signup', authData)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }
}
