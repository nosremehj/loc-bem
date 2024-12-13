import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  private apiUrl = 'http://localhost:8080/oferta';
  constructor(private http: HttpClient) {}

  getOffer(offerGet: any, searchTerm?: string): Observable<any> {
    if (searchTerm) {
      return this.http.post(
        `${API_CONFIG.baseUrl}/oferta/list-as-post?searchTerm=${searchTerm}`,
        offerGet
      );
    } else {
      return this.http.post(
        `${API_CONFIG.baseUrl}/oferta/list-as-post`,
        offerGet
      );
    }
  }
  getOneOffer(id: number, coordenadas: any): Observable<any> {
    return this.http.get<any>(
      `${API_CONFIG.baseUrl}/oferta/${id}?latitude=${coordenadas.latitude}&longitude=${coordenadas.longitude}`
    );
  }

  pegarTodasAsOfertas(offerGet: any, searchTerm?: string): Observable<any> {
    if (searchTerm) {
      return this.http.get(
        `${API_CONFIG.baseUrl}/oferta/?latitude=${offerGet.latitude}&longitude=${offerGet.longitude}&searchTerm=${searchTerm}`
      );
    } else {
      return this.http.get(
        `${API_CONFIG.baseUrl}/oferta/?latitude=${offerGet.latitude}&longitude=${offerGet.longitude}`
      );
    }
  }
  addVeiculo(veiculo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, veiculo);
  }
}
