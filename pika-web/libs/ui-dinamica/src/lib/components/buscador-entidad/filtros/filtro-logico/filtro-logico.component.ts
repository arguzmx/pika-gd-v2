import { Component, ComponentRef, Input } from '@angular/core';
import { Filtro, OperadorFiltro, Propiedad } from '@pika-web/pika-cliente-api';
import { BuscadorEntidadComponent } from '../../buscador-entidad.component';

@Component({
  selector: 'pika-web-filtro-logico',
  templateUrl: './filtro-logico.component.html',
  styleUrls: ['./filtro-logico.component.less'],
})
export class FiltroLogicoComponent {

  @Input() nombreComponente: string = 'i18nLogico';
  @Input() propiedad: Propiedad;
  _ref: ComponentRef<any>;
  checked: boolean = false;
  firstValue?: string;
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
  }

  public ObtenerFiltro(): Filtro {
    if (this.firstValue != undefined) {
      return {
        campo: this.childUniqueKey,
        negar: this.checked,
        operador: this.selectValue = OperadorFiltro.Igual,
        valores: [this.firstValue!]
      }
    }
    return null!;
  }

  removeObject() {
    this.parentRef.isNotSelected(this.childUniqueKey);
    this._ref.destroy();
  }

}
