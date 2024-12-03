import { Component, OnInit } from '@angular/core';
import { OffersService } from './service/offers.service';
import { PreferenciaUsuario } from './models/preferencia-usuario';
import { ChatbotService } from './chatbot/chatbot.service';
import { MatDialog } from '@angular/material/dialog';
import { ChatBotComponent } from '../chat-bot/chat-bot/chat-bot.component';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {
  preferences: Partial<PreferenciaUsuario> | null = null;
  ofertas: any | null = null;
  term: string = '';
  filtroAtivo: boolean = false;

  constructor(
    private service: OffersService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.service
      .pegarTodasAsOfertas(data.coordenadasUsuario)
      .subscribe((res) => {
        this.toastr.success('Listagem concluída com sucesso!');
        this.ofertas = res.content;
        this.spinner.hide();
      });
  }

  startChat1() {
    const dialogRef = this.dialog.open(ChatBotComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.toastr.success(
          'Obrigado! Você concluiu o questionário.',
          'Chat Bot'
        );
        this.spinner.show();

        this.service.getOffer(result).subscribe(
          (response) => {
            this.toastr.success('Listagem concluída com sucesso!', 'Chat Bot');
            this.ofertas = response.content;
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            this.toastr.error(
              'Ops... Não foi possível concluir essa ação.',
              'Chat Bot'
            );
            console.error('Erro ao buscar ofertas:', error);
          }
        );
      }
    });
  }

  parteInteiraDistancia(value: number): number {
    let result = Math.floor(value);
    result = result < 1 ? 1 : result;
    return result;
  }

  searchTerm() {
    this.spinner.show();

    this.service
      .pegarTodasAsOfertas(data.coordenadasUsuario, this.term)
      .subscribe(
        (res) => {
          this.toastr.success('Filtro realizado com sucesso!', 'Filtro');
          this.ofertas = res.content;
          this.filtroAtivo = true;
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error(
            'Ops... Não foi possível concluir essa ação.',
            'Filtro'
          );
          console.error('Erro ao buscar ofertas:', error);
        }
      );
  }

  limparFiltro() {
    this.spinner.show();
    this.filtroAtivo = false;
    this.term = '';
    this.service.pegarTodasAsOfertas(data.coordenadasUsuario).subscribe(
      (res) => {
        this.toastr.success('Filtro limpo!', 'Filtro');
        this.ofertas = res.content;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error(
          'Ops... Não foi possível concluir essa ação.',
          'Filtro'
        );
        console.error('Erro ao buscar ofertas:', error);
      }
    );
  }
}

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
