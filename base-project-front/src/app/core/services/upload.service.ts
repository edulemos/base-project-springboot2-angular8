import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../models/User';
import { FileDto } from '../models/FileDto';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private urlApi: string;
  user: User;

  constructor(private http: HttpClient) {
    this.urlApi = environment.urlApi;
  }

  upload(formData: FormData) {
      return this.http.post<FileDto>(`${this.urlApi}/upload`, formData);
  }


}
