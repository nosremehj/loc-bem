import { Component, Inject } from '@angular/core';
import {
  CaracteristicaVeiculo,
  Combustivel,
  EstadoVeiculo,
  TipoVeiculo,
} from '../../offers/models/preferencia-usuario';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChatbotService } from '../../offers/chatbot/chatbot.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
})
export class ChatBotComponent {
  estadoVeiculoOptions = Object.values(EstadoVeiculo);
  tipoVeiculoOptions = Object.values(TipoVeiculo);
  combustivelOptions = Object.values(Combustivel);
  caracteristicaVeiculoOptions = Object.values(CaracteristicaVeiculo);

  // currentQuestionIndex = 0;
  // currentQuestion: any;
  currentAnswer: any;
  // preferences: any = {};

  preferences: any = {}; // Inicializamos um objeto vazio para armazenar as respostas
  currentQuestionIndex: number = 0; // Índice da pergunta atual
  currentQuestion: any; // Pergunta atual
  coordenadasUsuario = { latitude: -10.704446, longitude: -48.410793 }; // Coordenadas fixas para exemplo

  constructor(
    public dialogRef: MatDialogRef<ChatBotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    this.askNextQuestion();
  }

  // questions = [
  //   { question: 'Qual a importância do preço? (1-10)', type: 'numeric' },
  //   {
  //     question: 'Qual o estado do veículo?',
  //     type: 'enum',
  //     enumType: EstadoVeiculo,
  //     options: Object.values(EstadoVeiculo),
  //   },
  //   {
  //     question: 'Qual a importância do estado do veículo? (1-10)',
  //     type: 'numeric',
  //   },
  //   {
  //     question: 'Qual a importância da quilometragem? (1-10)',
  //     type: 'numeric',
  //   },
  //   {
  //     question: 'Quais os tipos de veículos preferidos?',
  //     type: 'enum',
  //     enumType: TipoVeiculo,
  //     options: Object.values(TipoVeiculo),
  //   },
  //   {
  //     question: 'Qual a importância do tipo de veículo? (1-10)',
  //     type: 'numeric',
  //   },
  //   {
  //     question: 'Quais os tipos de combustível preferidos?',
  //     type: 'enum',
  //     enumType: Combustivel,
  //     options: Object.values(Combustivel),
  //   },
  //   {
  //     question: 'Qual a importância do tipo de combustível? (1-10)',
  //     type: 'numeric',
  //   },
  //   {
  //     question: 'Quais características adicionais preferidas?',
  //     type: 'enum',
  //     enumType: CaracteristicaVeiculo,
  //     options: Object.values(CaracteristicaVeiculo),
  //   },
  //   {
  //     question: 'Qual a importância das características adicionais? (1-10)',
  //     type: 'numeric',
  //   },
  //   {
  //     question: 'Qual a distância máxima para buscar o veículo? (em km)',
  //     type: 'numeric',
  //   },
  // ];
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

  // askNextQuestion() {
  //   // Se as perguntas terminaram, exiba o resultado
  //   if (this.currentQuestionIndex < this.questions.length) {
  //     this.currentQuestion = this.questions[this.currentQuestionIndex];
  //   } else {
  //     console.log(this.questions);
  //     console.log(this.preferences); // Dados finais
  //   }
  // }

  // onAnswer(answer: any) {
  //   const current = this.currentQuestion;

  //   if (current.type === 'numeric') {
  //     this.preferences[current.question] = parseInt(answer, 10);
  //   } else if (current.type === 'enum') {
  //     this.preferences[current.question] = [answer]; // Pode ser um único ou múltiplos valores
  //   }

  //   this.currentQuestionIndex++;
  //   this.askNextQuestion();
  // }
  askNextQuestion() {
    // Verifica se ainda há perguntas a serem feitas
    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    } else {
      // Finaliza e exibe os dados finais
      const data = {
        ...this.preferences,
        coordenadasUsuario: this.coordenadasUsuario,
      };
      this.dialogRef.close(data);
      // console.log('Dados finais:', data);
    }
  }

  onAnswer(answer: any) {
    const current = this.currentQuestion;

    if (current.type === 'numeric') {
      this.preferences[current.key] = parseInt(answer, 10);
    } else if (current.type === 'enum') {
      this.preferences[current.key] = Array.isArray(answer) ? answer : [answer];
    }

    this.currentQuestionIndex++;
    this.askNextQuestion();
  }
}
