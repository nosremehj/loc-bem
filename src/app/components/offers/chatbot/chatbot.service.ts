import { Injectable } from '@angular/core';
import {
  CaracteristicaVeiculo,
  Combustivel,
  EstadoVeiculo,
  PreferenciaUsuario,
  TipoVeiculo,
} from '../models/preferencia-usuario';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  constructor() {}

  private preferences: Partial<PreferenciaUsuario> = {};

  async startChat(): Promise<Partial<PreferenciaUsuario>> {
    this.preferences.pesoPreco = await this.askNumericQuestion(
      'Qual a importância do preço? (1-10)'
    );
    this.preferences.estadoVeiculo = await this.askEnumQuestion<EstadoVeiculo>(
      'Qual o estado do veículo?',
      EstadoVeiculo
    );
    this.preferences.pesoEstadoVeiculo = await this.askNumericQuestion(
      'Qual a importância do estado do veículo? (1-10)'
    );

    if (this.preferences.estadoVeiculo?.includes(EstadoVeiculo.NOVO)) {
      this.preferences.pesoQuilometragem = 0; // Carro novo, quilometragem é irrelevante.
    } else {
      this.preferences.pesoQuilometragem = await this.askNumericQuestion(
        'Qual a importância da quilometragem? (1-10)'
      );
    }

    this.preferences.tipoVeiculo = await this.askEnumQuestion<TipoVeiculo>(
      'Quais os tipos de veículos preferidos?',
      TipoVeiculo
    );
    this.preferences.pesoTipoVeiculo = await this.askNumericQuestion(
      'Qual a importância do tipo de veículo? (1-10)'
    );

    this.preferences.combustivel = await this.askEnumQuestion<Combustivel>(
      'Quais os tipos de combustível preferidos?',
      Combustivel
    );
    this.preferences.pesoCombustivel = await this.askNumericQuestion(
      'Qual a importância do tipo de combustível? (1-10)'
    );

    this.preferences.caracteristicas =
      await this.askEnumQuestion<CaracteristicaVeiculo>(
        'Quais características adicionais preferidas?',
        CaracteristicaVeiculo
      );
    this.preferences.pesoCaracteristicas = await this.askNumericQuestion(
      'Qual a importância das características adicionais? (1-10)'
    );

    this.preferences.distanciaMaxima = await this.askNumericQuestion(
      'Qual a distância máxima para buscar o veículo? (em km)'
    );
    // this.preferences.coordenadasUsuario = await this.getUserCoordinates();

    this.preferences.coordenadasUsuario = {
      latitude: -10.704446, // Exemplo de Latitude (São Paulo)
      longitude: -48.410793, // Exemplo de Longitude (São Paulo)
    };

    return this.preferences;
  }

  // setUserLocation() {
  //   // Defina manualmente as coordenadas do usuário
  //   this.preferences.coordenadasUsuario = {
  //     latitude: -23.55052, // Exemplo de Latitude (São Paulo)
  //     longitude: -46.633308, // Exemplo de Longitude (São Paulo)
  //   };
  // }

  private async askNumericQuestion(question: string): Promise<number> {
    const response = prompt(question);
    return Number(response);
  }

  private async askEnumQuestion<T>(
    question: string,
    enumType: any
  ): Promise<T[]> {
    const keys = Object.keys(enumType);
    const response = prompt(`${question}\n${keys.join(', ')}`);
    return (
      response
        ?.split(',')
        .map((r) => enumType[r.trim() as keyof typeof enumType]) ?? []
    );
  }

  private async getUserCoordinates(): Promise<{
    latitude: number;
    longitude: number;
  }> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        (error) => reject(error)
      );
    });
  }
}
