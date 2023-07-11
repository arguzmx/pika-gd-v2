import { Component, ComponentRef, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core'
import { OperadorFiltro } from '@pika-web/pika-cliente-api';
import { BuscadorEntidadComponent } from '../../buscador-entidad.component';

@Component({
  selector: 'pika-web-filtro-texto',
  templateUrl: './filtro-texto.component.html',
  styleUrls: ['./filtro-texto.component.less'],
})
export class FiltroTextoComponent {

  @Input() nombreComponente: string = 'i18nTexto';
  @Input() propiedades: any[];
  _ref: ComponentRef<any>;

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  operatorArray: any[] = []

  fields: FormlyFieldConfig[] = [

    {
      fieldGroupClassName: 'ant-row',
      fieldGroup: [
        {
          key: 'no',
          className: 'ant-col-2',
          type: 'checkbox',
          props: {
            label: 'No'
          }
        },
        {
          key: 'operador',
          className: 'ant-col-8',
          type: 'select',
          props: {
            label: 'Operador',
            placeholder: 'Seleccione una opción',
            options: this.operatorOptions()
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'ant-row',
      fieldGroup: [
        {
          key: 'firstFilter',
          className: 'ant-col-10',
          type: 'input'
        }
      ]
    }

  ]

  operatorOptions() {
    for (var op in OperadorFiltro) { this.operatorArray.push({ label: op, value: op }) };
    return this.operatorArray;
  }


  removeObject() {
    this._ref.destroy();
  }

}
