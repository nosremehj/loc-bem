import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/components/config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  registerPerson(personData: {
    name: string;
    email: string;
    password: string;
    personRegistration: string;
    cep: string;
    longitude: string;
    latitude: string;
  }): Observable<any> {
    return this.http.post<any>(API_CONFIG.baseUrl + `/users`, personData);
  }
}
