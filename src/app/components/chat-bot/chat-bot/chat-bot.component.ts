import { Component, Inject } from '@angular/core';
import {
  CaracteristicaVeiculo,
  Combustivel,
  EstadoVeiculo,
  TipoVeiculo,
} from '../../offers/models/preferencia-usuario';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
})
export class ChatBotComponent {
  currentAnswer: any;
  preferences: any = {}; // Inicializamos um objeto vazio para armazenar as respostas
  currentQuestionIndex: number = 0; // Índice da pergunta atual
  currentQuestion: any; // Pergunta atual
  coordenadasUsuario = { latitude: -10.704446, longitude: -48.410793 }; // Coordenadas fixas, é apenas adicionar aqui
  numericValue: number | null = null;
  selectedOptions: string[] = [];
  numericError: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<ChatBotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    this.askNextQuestion();
  }

  questions = [
    {
      question: 'Qual a importância do preço? (1-10)',
      type: 'numeric',
      key: 'pesoPreco',
    },
    {
      question: 'Qual o estado do veículo?',
      type: 'enum',
      enumType: EstadoVeiculo,
      options: Object.values(EstadoVeiculo),
      key: 'estadoVeiculo',
    },
    {
      question: 'Qual a importância do estado do veículo? (1-10)',
      type: 'numeric',
      key: 'pesoEstadoVeiculo',
    },
    {
      question: 'Qual a importância da quilometragem? (1-10)',
      type: 'numeric',
      key: 'pesoQuilometragem',
    },
    {
      question: 'Quais os tipos de veículos preferidos?',
      type: 'enum',
      enumType: TipoVeiculo,
      options: Object.values(TipoVeiculo),
      key: 'tipoVeiculo',
    },
    {
      question: 'Qual a importância do tipo de veículo? (1-10)',
      type: 'numeric',
      key: 'pesoTipoVeiculo',
    },
    {
      question: 'Quais os tipos de combustível preferidos?',
      type: 'enum',
      enumType: Combustivel,
      options: Object.values(Combustivel),
      key: 'combustivel',
    },
    {
      question: 'Qual a importância do tipo de combustível? (1-10)',
      type: 'numeric',
      key: 'pesoCombustivel',
    },
    {
      question: 'Quais características adicionais preferidas?',
      type: 'enum',
      enumType: CaracteristicaVeiculo,
      options: Object.values(CaracteristicaVeiculo),
      key: 'caracteristicas',
    },
    {
      question: 'Qual a importância das características adicionais? (1-10)',
      type: 'numeric',
      key: 'pesoCaracteristicas',
    },
    {
      question: 'Qual a distância máxima para buscar o veículo? (em km)',
      type: 'numeric',
      key: 'distanciaMaxima',
    },
  ];

  // caso queira que fique buscando a coordenada automaticamente é só descomentar o metodo abaixo e comentar o metodo seguinte

  // askNextQuestion() {
  //   if (this.currentQuestionIndex < this.questions.length) {
  //     this.currentQuestion = this.questions[this.currentQuestionIndex];
  //     if (this.currentQuestion.type === 'enum') {
  //       this.selectedOptions = this.preferences[this.currentQuestion.key] || [];
  //     }
  //   } else {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.coordenadasUsuario.latitude = position.coords.latitude;
  //       this.coordenadasUsuario.longitude = position.coords.longitude;
  //       const data = {
  //         ...this.preferences,
  //         coordenadasUsuario: this.coordenadasUsuario,
  //       };
  //       console.log(data);
  //       this.dialogRef.close(data);
  //     });
  //   }
  // }

  // comente esse metodo para deixar automatico novamente e descomente o metodo que está acima
  askNextQuestion() {
    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      if (this.currentQuestion.type === 'enum') {
        this.selectedOptions = this.preferences[this.currentQuestion.key] || [];
      }
    } else {
      const data = {
        ...this.preferences,
        coordenadasUsuario: this.coordenadasUsuario,
      };
      this.dialogRef.close(data);
    }
  }

  toggleSelection(option: string) {
    const index = this.selectedOptions.indexOf(option);
    if (index === -1) {
      this.selectedOptions.push(option); // Adiciona à seleção
    } else {
      this.selectedOptions.splice(index, 1); // Remove da seleção
    }
  }

  capitalizeWords(text: string): string {
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

    return (
      corrections[text.toUpperCase()] ||
      text
        .toLowerCase()
        .replace(/_/g, ' ') // Substitui underscores por espaços
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );
  }

  // onAnswer() {
  //   const current = this.currentQuestion;

  //   if (current.type === 'numeric') {
  //     this.preferences[current.key] = this.numericValue;
  //   } else if (current.type === 'enum') {
  //     this.preferences[current.key] = this.selectedOptions.map((opt) =>
  //       opt.toUpperCase()
  //     ); // Envia em caixa alta
  //   }

  //   this.currentQuestionIndex++;
  //   this.numericValue = null; // Limpa o valor numérico para a próxima pergunta
  //   this.askNextQuestion();
  // }

  onAnswer() {
    const current = this.currentQuestion;

    if (current.type === 'numeric') {
      this.preferences[current.key] = this.numericValue;
    } else if (current.type === 'enum') {
      this.preferences[current.key] = this.selectedOptions.map((opt) =>
        opt.toUpperCase()
      ); // Envia em caixa alta

      // Verifica se o estado do veículo é "NOVO"
      if (
        current.key === 'estadoVeiculo' &&
        this.selectedOptions.includes('NOVO')
      ) {
        // Define valores automáticos para as perguntas a serem puladas
        this.preferences['pesoEstadoVeiculo'] = 10;
        this.preferences['pesoQuilometragem'] = 10;

        // Remove as perguntas a serem puladas da lista
        this.questions = this.questions.filter(
          (q) => q.key !== 'pesoEstadoVeiculo' && q.key !== 'pesoQuilometragem'
        );
      }
    }

    this.currentQuestionIndex++;
    this.numericValue = null; // Limpa o valor numérico para a próxima pergunta
    this.askNextQuestion();
  }

  closeDialog() {
    this.dialogRef.close(null);
  }

  isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.questions.length - 1;
  }

  getPlaceholder(): string {
    if (this.currentQuestion.key === 'distanciaMaxima') {
      return 'Digite a distância máxima (em km)';
    }
    return 'Digite um número entre 1 e 10';
  }

  getMinValue(): number {
    if (this.currentQuestion.key === 'distanciaMaxima') {
      return 1; // Valor mínimo para distância
    }
    return 1; // Valor mínimo para as perguntas de 1 a 10
  }

  getMaxValue(): number {
    if (this.currentQuestion.key === 'distanciaMaxima') {
      return 1500; // Sem restrições máximas específicas
    }
    return 10; // Valor máximo para as perguntas de 1 a 10
  }

  validateNumericValue() {
    if (this.numericValue === null) {
      this.numericError = null;
      return;
    }

    const minValue = this.getMinValue();
    const maxValue = this.getMaxValue();

    if (this.numericValue < minValue) {
      this.numericError = `O valor mínimo permitido é ${minValue}.`;
    } else if (this.numericValue > maxValue) {
      this.numericError = `O valor máximo permitido é ${maxValue}.`;
    } else {
      this.numericError = null;
    }
  }
}
