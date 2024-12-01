import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/components/config/api.config';
import { Credentials } from '../models/Credentials';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get(`${API_CONFIG.baseUrl}/users`);
  }

  login(creds: Credentials): Observable<any> {
    // Configura os parâmetros da URL
    const params = new HttpParams()
      .set('grant_type', 'password')
      .set('username', 'client-id')
      .set('password', 'secret-id');

    // Configura os cabeçalhos
    const headers = new HttpHeaders({
      Authorization: 'Basic Y2xpZW50LWlkOnNlY3JldC1pZA==', // O valor de autorização codificado em Base64
    });

    // Envia a requisição POST
    return this.http.post(
      `${API_CONFIG.baseUrl}/oauth/token?grant_type=password&username=${creds.username}&password=${creds.password}`,
      null,
      { headers }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('DGCSSj0wSt71IO0glFnvVKO0NqU');
  }
}
