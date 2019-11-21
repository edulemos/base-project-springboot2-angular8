import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models/User';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlApi: string;
  user: User;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.urlApi = environment.urlApi;
  }

  login(username, password) {
    return this.http.post(`${this.urlApi}/login`, { username, password })
      .pipe(
        tap((response: any) => {
          this.user = this.jwtHelper.decodeToken(response.token);
          localStorage.setItem('name', this.user.name);
          localStorage.setItem('email', this.user.email);
          localStorage.setItem('token', response.token);
        }),
        catchError((err: any) => {
          localStorage.clear();
          throw err;
        })
      );
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/';
  }

  register(user: User) {
    return this.http.post<User>(`${this.urlApi}/login/register`, user);
  }

  recover(user: User) {
    return this.http.post<User>(`${this.urlApi}/login/recover`, user);
  }

  recoverCheck(uuid: string) {
    const obj = {
      uuid: uuid
    };
    return this.http.post<User>(`${this.urlApi}/login/recover/check`, obj);
  }

  recoverSave(uuid: string, password: string) {
    const obj = {
      uuid: uuid,
      password: password
    };
    return this.http.post<User>(`${this.urlApi}/login/recover/save`, obj);
  }

}
