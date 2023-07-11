import { Component, ComponentRef, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { OperadorFiltro } from '@pika-web/pika-cliente-api';

@Component({
  selector: 'pika-web-filtro-fecha-hora',
  templateUrl: './filtro-fecha-hora.component.html',
  styleUrls: ['./filtro-fecha-hora.component.less'],
})
export class FiltroFechaHoraComponent {


  @Input() nombreComponente: string = 'i18nFechaHora';
  @Input() propiedades: any[];
  _ref: ComponentRef<any>;

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  operatorArray: any[] = []

  fields: FormlyFieldConfig[] = [
    {
      validators: {
        validation: [
          { name: 'dateTimeCompare', options: { errorPath: 'secondFilter' } }
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
          type: 'customDateTime',
          props: {
            label: "Fecha inicial"
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
          type: 'customDateTime',
          props: {
            label: 'Fecha final'
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
