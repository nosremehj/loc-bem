import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { OffersService } from '../service/offers.service';
import { CaracteristicasVeiculo } from './caracteristicas';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss'],
})
export class CreateOfferComponent {
  selectedFiles: File[] = [];
  previewUrls: string[] = [];
  veiculoForm: FormGroup;
  caracteristicasOpcoes = CaracteristicasVeiculo;
  veiculos: any[] = [];

  constructor(private service: OffersService, private fb: FormBuilder) {
    this.veiculoForm = this.fb.group({
      modelo: [''],
      anoFabricacao: [null],
      anoModelo: [null],
      preco: [null],
      descricao: [''],
      quilometragem: [null],
      condicao: [''],
      coordenadas: [''],
      imagens: [''],
      tipoVeiculo: [''],
      combustivel: [''],
      estadoVeiculo: [''],
      caracteristicas: this.fb.array([]), // Inicializando o array de características
    });
  }

  addVeiculo(): void {
    const formValue = this.veiculoForm.value;

    // Obter apenas as características selecionadas
    const caracteristicasSelecionadas = this.caracteristicasOpcoes.filter(
      (_, index) => formValue.caracteristicas[index]
    );

    const novoVeiculo = {
      ...formValue,
      caracteristicas: caracteristicasSelecionadas,
    };

    this.service.addVeiculo(novoVeiculo).subscribe(() => {
      this.resetForm();
    });
  }

  onFilesSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedFiles = Array.from(files);

      // Gerar pré-visualizações para cada arquivo
      this.previewUrls = [];
      this.selectedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewUrls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  get caracteristicasFormArray(): FormArray {
    return this.veiculoForm.get('caracteristicas') as FormArray;
  }

  private addCaracteristicasCheckboxes() {
    this.caracteristicasOpcoes.forEach(() => {
      this.caracteristicasFormArray.push(this.fb.control(false));
    });
  }

  resetForm(): void {
    this.veiculoForm.reset();
    this.caracteristicasFormArray.clear();
    this.addCaracteristicasCheckboxes();
  }
}
