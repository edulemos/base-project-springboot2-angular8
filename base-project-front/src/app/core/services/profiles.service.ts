import { Profile } from './../models/Profile';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  private urlApi: string;

  constructor(private http: HttpClient, private messageService: MessageService) {
    this.urlApi = environment.urlApi;
  }

  list(name: string) {
    let params = new HttpParams();
    if (name) {
      params = params.append('name', name);
    }
    return this.http.get<any[]>(`${this.urlApi}/profiles`, { params: params });
  }

  listAll() {
    return this.http.get<Profile[]>(`${this.urlApi}/profiles`);
  }


  save(profile: Profile) {
    if (profile.id) {
      return this.http.put<Profile>(`${this.urlApi}/profiles/${profile.id}`, profile);
    } else {
      return this.http.post<Profile>(`${this.urlApi}/profiles`, profile);
    }
  }

  delete(profile: Profile) {
    return this.http.delete(`${this.urlApi}/profiles/${profile.id}`);
  }

}
