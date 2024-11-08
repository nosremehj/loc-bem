import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/components/config/api.config';
import { Credentials } from '../models/Credentials';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  // authenticate(creds: Credentials) {
  //   return this.http.get(
  //     `${API_CONFIG.baseUrl}/oauth/token?grant_type=password&username=${creds.email}&password=${creds.password}`
  //   );
  // }

  getUser() {
    return this.http.get(`${API_CONFIG.baseUrl}/users`);
  }

  login(creds: Credentials): Observable<boolean> {
    return this.http
      .post<{ token: string }>(
        `${API_CONFIG.baseUrl}/oauth/token?grant_type=password&username=${creds.username}&password=${creds.password}`,
        { creds }
      )
      .pipe(
        map((response) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            return true;
          }
          return false;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
