import { Component, OnInit } from '@angular/core';
import { OffersService } from './service/offers.service';
import { PreferenciaUsuario } from './models/preferencia-usuario';
import { ChatbotService } from './chatbot/chatbot.service';
import { MatDialog } from '@angular/material/dialog';
import { ChatBotComponent } from '../chat-bot/chat-bot/chat-bot.component';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {
  preferences: Partial<PreferenciaUsuario> | null = null;
  ofertas: any | null = null;

  constructor(
    private service: OffersService,
    private chatBotService: ChatbotService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const data = {
      pesoPreco: 10,
      pesoQuilometragem: 5,
      pesoTipoVeiculo: 4,
      tipoVeiculo: ['SEDAN'],
      pesoCombustivel: 5,
      combustivel: ['GASOLINA'],
      pesoEstadoVeiculo: 5,
      estadoVeiculo: ['NOVO'],
      pesoCaracteristicas: 1,
      caracteristicas: ['AR_CONDICIONADO'],
      distanciaMaxima: 10,
      coordenadasUsuario: {
        latitude: -10.704446,
        longitude: -48.410793,
      },
    };

    this.service
      .pegarTodasAsOfertas(data.coordenadasUsuario)
      .subscribe((res) => {
        this.ofertas = res.content;
      });
    // this.service.getOffer(data).subscribe((res) => {
    //   this.ofertas = res.content;
    // });
  }

  startChat1() {
    const dialogRef = this.dialog.open(ChatBotComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.service.getOffer(result).subscribe(
          (response) => {
            this.ofertas = response.content;
            console.log('Ofertas recebidas:', response);
          },
          (error) => {
            console.error('Erro ao buscar ofertas:', error);
          }
        );
      }
    });
  }
  async startChat() {
    this.preferences = await this.chatBotService.startChat();

    if (this.preferences) {
      this.service.getOffer(this.preferences).subscribe(
        (response) => {
          this.ofertas = response.content;
          console.log('Ofertas recebidas:', response);
        },
        (error) => {
          console.error('Erro ao buscar ofertas:', error);
        }
      );
    }
  }

  parteInteiraDistancia(value: number): number {
    return Math.floor(value);
  }
}
