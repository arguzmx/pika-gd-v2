import { Component, ComponentRef, Input } from '@angular/core';
import { Filtro, OperadorFiltro, Propiedad } from '@pika-web/pika-cliente-api';
import { BuscadorEntidadComponent } from '../../buscador-entidad.component';

@Component({
  selector: 'pika-web-filtro-hora',
  templateUrl: './filtro-hora.component.html',
  styleUrls: ['./filtro-hora.component.less'],
})
export class FiltroHoraComponent {


  @Input() nombreComponente: string = 'i18nHora';
  @Input() propiedad: Propiedad;
  _ref: ComponentRef<any>;
  checked: boolean = false;
  firstValue?: string;
  secondValue?: string;
  operatorArray: any[] = []
  selectValue: any;
  operadorEntre: string;
  childUniqueKey: string;
  parentRef: BuscadorEntidadComponent;

  ngOnInit(): void {
    this.operatorOptions();
  }

  operatorOptions() {
    this.operatorArray.push({ label: OperadorFiltro.Igual, value: OperadorFiltro.Igual });
    this.operatorArray.push({ label: OperadorFiltro.Entre, value: OperadorFiltro.Entre });
    this.operatorArray.push({ label: OperadorFiltro.Mayor, value: OperadorFiltro.Mayor });
    this.operatorArray.push({ label: OperadorFiltro.MayorIgual, value: OperadorFiltro.MayorIgual });
    this.operatorArray.push({ label: OperadorFiltro.Menor, value: OperadorFiltro.Menor });
    this.operatorArray.push({ label: OperadorFiltro.MenorIgual, value: OperadorFiltro.MenorIgual });
    this.operadorEntre = OperadorFiltro.Entre
  }

  public ObtenerFiltro(): Filtro {
    if (this.selectValue != this.operadorEntre) {
      if (this.selectValue != undefined && this.firstValue != undefined) {
        return {
          campo: this.childUniqueKey,
          negar: this.checked,
          operador: this.selectValue,
          valores: [this.firstValue!]
        }
      }
    }
    else {
      if (this.selectValue != undefined && this.firstValue != undefined && this.secondValue != undefined) {
        return {
          campo: this.childUniqueKey,
          negar: this.checked,
          operador: this.selectValue,
          valores: [this.firstValue!, this.secondValue!]
        }
      }
    }
    return null!;
  }

  removeObject() {
    this.parentRef.isNotSelected(this.childUniqueKey);
    this._ref.destroy();
  }

}
