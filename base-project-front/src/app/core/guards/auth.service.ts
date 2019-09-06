import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public isAuthorized(expectedRole): boolean {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    let b = false;
    decodedToken.authorities.forEach(function (value) {
      const role = value.authority;
      if (expectedRole === role) {
        b = true;
      }
    });
    return b;
  }

}
