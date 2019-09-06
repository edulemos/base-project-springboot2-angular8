import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = environment.urlApi;
  }

  listAll() {
    return this.http.get<any[]>(`${this.urlApi}/roles`);
  }
}
