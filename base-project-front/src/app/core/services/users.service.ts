import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = environment.urlApi;
  }

  list(username: string) {
    let params = new HttpParams();
    if (username) {
      params = params.append('name', username);
    }
    return this.http.get<any[]>(`${this.urlApi}/users`, { params: params });
  }

  save(user: User) {
    if (user.id) {
      return this.http.put<User>(`${this.urlApi}/users/${user.id}`, user);
    } else {
      return this.http.post<User>(`${this.urlApi}/users`, user);
    }
  }

  delete(user: User) {
    return this.http.delete(`${this.urlApi}/users/${user.id}`);
  }

}


