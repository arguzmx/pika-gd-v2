import { Component, ComponentRef, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { OperadorFiltro } from '@pika-web/pika-cliente-api';
import { BuscadorEntidadComponent } from '../../buscador-entidad.component';

@Component({
  selector: 'pika-web-filtro-entero',
  templateUrl: './filtro-entero.component.html',
  styleUrls: ['./filtro-entero.component.less'],
})
export class FiltroEnteroComponent {

  @Input() nombreComponente: string = 'i18nEntero';
  @Input() propiedades: any[];
  _ref: ComponentRef<any>;
  public unique_key: any;
  public parentRef: BuscadorEntidadComponent;

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  operatorArray: any[] = []

  fields: FormlyFieldConfig[] = [
    {
      validators: {
        validation: [
          { name: 'numberCompare', options: { errorPath: 'secondFilter' } }
        ],
      },
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
          defaultValue: '0',
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
          type: 'input',
          props: {
            label: 'Valor',
            type: 'number'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'ant-row',
      fieldGroup: [
        {
          key: 'secondFilter',
          className: 'ant-col-10',
          type: 'input',
          props: {
            label: 'Valor final',
            type: 'number'
          },
          expressions: {
            hide: 'model.operador != "Entre"'
          }
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
