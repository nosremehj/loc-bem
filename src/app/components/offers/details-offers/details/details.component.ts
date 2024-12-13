import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../service/offers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  load: boolean = true;

  offer: any = {
    id: '',
    pesoPreco: '',
    pesoQuilometragem: '',
    pesoTipoVeiculo: '',
    tipoVeiculo: [],
    pesoCombustivel: '',
    combustivel: [],
    pesoEstadoVeiculo: '',
    estadoVeiculo: [],
    pesoCaracteristicas: '',
    caracteristicas: [],
    distanciaMaxima: '',
    coordenadasUsuario: {
      latitude: '',
      longitude: '',
    },
  };

  coordenadas: any = {
    latitude: '',
    longitude: '',
  };
  ngOnInit(): void {
    this.spinner.show();

    this.offer.id = this.route.snapshot.paramMap.get('id');

    this.findById();
  }
  constructor(
    private service: OffersService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  findById(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.coordenadas.latitude = position.coords.latitude;
      this.coordenadas.longitude = position.coords.longitude;
      this.service
        .getOneOffer(this.offer.id, this.coordenadas)
        .subscribe((resposta) => {
          this.offer = resposta;
          this.spinner.hide();
          this.toastr.success('Carregado com sucesso!');
          this.load = false;
        });
    });
  }

  capitalizeWords(text: string): string {
    return text
      .toLowerCase()
      .replace(/_/g, ' ') // Substitui underscores por espaços
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  capitalizeEnumList(enums: string[]): string {
    return enums
      .map((item) =>
        item
          .toLowerCase()
          .replace(/_/g, ' ') // Substitui underscores por espaços
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza cada palavra
          .join(' ')
      )
      .join(', '); // Junta os itens com vírgula e espaço
  }

  parteInteiraDistancia(value: number): number {
    let result = Math.floor(value);
    result = result < 1 ? 1 : result;
    return result;
  }

  capitalizeEnumListWithCorrections(enums: string[]): string {
    const corrections: { [key: string]: string } = {
      // EstadoVeiculo
      NOVO: 'Novo',
      SEMI_NOVO: 'Semi-novo',
      USADO: 'Usado',
      // TipoVeiculo
      SEDAN: 'Sedan',
      HATCH: 'Hatch',
      COUPE: 'Coupé',
      CONVERTIVEL: 'Conversível',
      SUV: 'SUV',
      CROSSOVER: 'Crossover',
      MINIVAN: 'Minivan',
      PICKUP: 'Picape',
      CAMINHAO_LEVE: 'Caminhão Leve',
      CAMINHAO_PESADO: 'Caminhão Pesado',
      VAN: 'Van',
      MOTOCICLETA: 'Motocicleta',
      SCOOTER: 'Scooter',
      BICICLETA: 'Bicicleta',
      VEICULO_ELETRICO: 'Veículo Elétrico',
      VEICULO_HIBRIDO: 'Veículo Híbrido',
      VEICULO_MILITAR: 'Veículo Militar',
      VEICULO_DE_EMERGENCIA: 'Veículo de Emergência',
      VEICULO_INDUSTRIAL: 'Veículo Industrial',
      MOTORHOME: 'Motorhome',
      TRAILER: 'Trailer',
      VEICULO_AQUATICO: 'Veículo Aquático',
      VEICULO_OFF_ROAD: 'Veículo Off-road',
      TRATOR: 'Trator',
      AERONAVE_LEVE: 'Aeronave Leve',
      AERONAVE: 'Aeronave',
      // Combustivel
      GASOLINA: 'Gasolina',
      ETANOL: 'Etanol',
      DIESEL: 'Diesel',
      GAS_NATURAL: 'Gás Natural',
      ELETRICO: 'Elétrico',
      // CaracteristicaVeiculo
      AR_CONDICIONADO: 'Ar-condicionado',
      DIRECAO_HIDRAULICA: 'Direção Hidráulica',
      CAMBIO_AUTOMATICO: 'Câmbio Automático',
      BANCOS_DE_COURO: 'Bancos de Couro',
      CONTROLE_CRUISE: 'Controle de Cruzeiro',
      SISTEMA_SOM_PREMIUM: 'Sistema de Som Premium',
      SENSOR_ESTACIONAMENTO: 'Sensor de Estacionamento',
      TETO_SOLAR: 'Teto Solar',
      GPS: 'GPS',
      FAROIS_XENON: 'Faróis de Xenon',
      CAMERA_RE: 'Câmera de Ré',
      ASSISTENTE_FAIXA: 'Assistente de Faixa',
      CONTROLE_TRACAO: 'Controle de Tração',
      PORTA_MALAS_AUTOMATICO: 'Porta-malas Automático',
      AQUECIMENTO_BANCOS: 'Aquecimento dos Bancos',
      VIDROS_ELETRICOS: 'Vidros Elétricos',
      SENSOR_CHUVA: 'Sensor de Chuva',
      BLUETOOTH: 'Bluetooth',
      CONTROLE_VOZ: 'Controle de Voz',
      AIRBAGS_LATERAIS: 'Airbags Laterais',
      CONTROLE_ESTABILIDADE: 'Controle de Estabilidade',
      RECONHECIMENTO_SINAIS: 'Reconhecimento de Sinais',
      CARREGADOR_WIRELESS: 'Carregador Wireless',
      MONITOR_PRESSAO_PNEUS: 'Monitor de Pressão dos Pneus',
      ACIONAMENTO_START_STOP: 'Acionamento Start-Stop',
      PORTAS_AUTOMATICAS: 'Portas Automáticas',
    };

    return enums
      .map((item) => corrections[item] || item) // Aplica as correções ou mantém o texto original
      .join(', '); // Junta os itens com vírgula e espaço
  }
}
