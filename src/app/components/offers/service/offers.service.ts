import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  private apiUrl = 'http://localhost:8080/oferta';
  private apiUrl1 = 'http://localhost:8080/oferta/list-as-post';
  constructor(private http: HttpClient) {}

  getOffer(offerGet: any): Observable<any> {
    return this.http.post(this.apiUrl1, offerGet);
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

  createOffer(offerData: {
    modelo: string;
    anoFabricação: number;
    anoModelo: number;
    preco: number;
    descricao: string;
    quiolometragem: number;
    condicao: string;
    coordenadas: string;
    imagens: [string];
    tipoVeiculo: string;
    combustivel: string;
    estadoVeiculo: string;
    caracteristicas: [string];
  }): Observable<any> {
    return this.http.post<any>(API_CONFIG.baseUrl + `/oferta`, offerData);
  }

  addVeiculo(veiculo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, veiculo);
  }
}
