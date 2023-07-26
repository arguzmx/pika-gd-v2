import { ChangeDetectionStrategy, Component, ComponentRef, Input, OnInit } from '@angular/core';
import { Filtro, OperadorFiltro, Propiedad } from '@pika-web/pika-cliente-api';
import { BuscadorEntidadComponent } from '../../buscador-entidad.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'pika-web-filtro-texto',
  templateUrl: './filtro-texto.component.html',
  styleUrls: ['./filtro-texto.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltroTextoComponent implements OnInit {

  @Input() nombreComponente: string = 'i18nTexto';
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
    this.operatorArray.push({ label: OperadorFiltro.ComienzaCon, value: OperadorFiltro.ComienzaCon });
    this.operatorArray.push({ label: OperadorFiltro.Contiene, value: OperadorFiltro.Contiene });
    this.operatorArray.push({ label: OperadorFiltro.Igual, value: OperadorFiltro.Igual });
    this.operatorArray.push({ label: OperadorFiltro.TerminaCon, value: OperadorFiltro.TerminaCon });
    this.operatorArray.push({ label: OperadorFiltro.TextoCompleto, value: OperadorFiltro.TextoCompleto });
  }

  public ObtenerFiltro(): Filtro {
    if (this.selectValue != undefined && this.firstValue != undefined) {
      return {
        campo: this.childUniqueKey,
        negar: this.checked,
        operador: this.selectValue,
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
