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
}
