import { Component, ComponentRef, Input } from '@angular/core';
import { Filtro, OperadorFiltro, Propiedad } from '@pika-web/pika-cliente-api';
import { BuscadorEntidadComponent } from '../../buscador-entidad.component';

@Component({
  selector: 'pika-web-filtro-fecha-hora',
  templateUrl: './filtro-fecha-hora.component.html',
  styleUrls: ['./filtro-fecha-hora.component.less'],
})
export class FiltroFechaHoraComponent {


  @Input() nombreComponente: string = 'i18nFechaHora';
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
  operators = OperadorFiltro;

  ngOnInit(): void {
    this.operatorOptions();
  }

  operatorOptions() {
    this.operatorArray.push({ label: this.operators.Igual, value: this.operators.Igual });
    this.operatorArray.push({ label: this.operators.Entre, value: this.operators.Entre });
    this.operatorArray.push({ label: this.operators.Mayor, value: this.operators.Mayor });
    this.operatorArray.push({ label: this.operators.MayorIgual, value: this.operators.MayorIgual });
    this.operatorArray.push({ label: this.operators.Menor, value: this.operators.Menor });
    this.operatorArray.push({ label: this.operators.MenorIgual, value: this.operators.MenorIgual });
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
