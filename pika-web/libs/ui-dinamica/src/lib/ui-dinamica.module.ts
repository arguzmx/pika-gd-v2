import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorTabularComponent } from './components/editor-tabular/editor-tabular.component';
import { TablaDinamicaComponent } from './components/tabla-dinamica/tabla-dinamica.component';
import { EditorEntidadComponent } from './components/editor-entidad/editor-entidad.component';
import { BuscadorEntidadComponent } from './components/buscador-entidad/buscador-entidad.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd';
import { DatePickerComponent } from './components/customDateComponents/date-picker/date-picker.component';
import { DateTimePickerComponent } from './components/customDateComponents/date-time-picker/date-time-picker.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { TimePickerComponent } from './components/customDateComponents/time-picker/time-picker.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { PanelWrapperComponent } from './components/customWrappers/panel-wrapper/panel-wrapper.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { AgGridModule } from 'ag-grid-angular';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { TranslateModule } from '@ngx-translate/core';
import { FiltroTextoComponent } from './components/buscador-entidad/filtros/filtro-texto/filtro-texto.component';
import { FiltroDecimalComponent } from './components/buscador-entidad/filtros/filtro-decimal/filtro-decimal.component';
import { FiltroEnteroComponent } from './components/buscador-entidad/filtros/filtro-entero/filtro-entero.component';
import { FiltroFechaComponent } from './components/buscador-entidad/filtros/filtro-fecha/filtro-fecha.component';
import { FiltroHoraComponent } from './components/buscador-entidad/filtros/filtro-hora/filtro-hora.component';
import { FiltroFechaHoraComponent } from './components/buscador-entidad/filtros/filtro-fecha-hora/filtro-fecha-hora.component';
import { FiltroLogicoComponent } from './components/buscador-entidad/filtros/filtro-logico/filtro-logico.component';
import { FiltroTextoIndexadoComponent } from './components/buscador-entidad/filtros/filtro-texto-indexado/filtro-texto-indexado.component';
import { FiltroListaSeleccionSimpleComponent } from './components/buscador-entidad/filtros/filtro-lista-seleccion-simple/filtro-lista-seleccion-simple.component';
import { FiltroListaSeleccionMultipleComponent } from './components/buscador-entidad/filtros/filtro-lista-seleccion-multiple/filtro-lista-seleccion-multiple.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

/**
 * Array para definir tipos de formularios personalizados para formly
 */
const TYPESFORM = [
  { name: 'customDate', wrappers: ['form-field'] },
  { name: 'customDate', component: DatePickerComponent },
  { name: 'customTime', wrappers: ['form-field'] },
  { name: 'customTime', component: TimePickerComponent },
  { name: 'customDateTime', wrappers: ['form-field'] },
  { name: 'customDateTime', component: DateTimePickerComponent }
];

/**
 * Array para definir mensajes de validacion en formulario personalizado
 */
const VALIDATIONMESSAGESFORM = [{ name: 'required', message: 'El campo es requerido' }];

/**
 * Array para definir nombres de plantillas personalizadas para formly
 */
const WRAPPERSFORM = [{ name: 'panel', component: PanelWrapperComponent }];

/**
 * Funcion que valida hora final y hora inicial en controles filtroHora
 * @param control de tipo AbstractControl para obtener el valor de los input para filtro
 * @returns if error retorna mensaje else null
 */
export function timeValidation(control: AbstractControl) {
  const { firstFilter, secondFilter } = control.value;
  if ((firstFilter != null || firstFilter != undefined) && (secondFilter != null || secondFilter != undefined)) {
    if (secondFilter < firstFilter) { return { timeCompare: { message: 'Hora final no puede ser menor a hora inicial' } }; }
  }
  return null;
}

/**
 * Funcion que valida Fecha final y fecha inicial en controles filtroFecha
 * @param control de tipo AbstractControl para obtener el valor de los input para filtro
 * @returns if error retorna mensaje else null
 */
export function dateValidation(control: AbstractControl) {
  const { firstFilter, secondFilter } = control.value;
  if ((firstFilter != null || firstFilter != undefined) && (secondFilter != null || secondFilter != undefined)) {
    if (secondFilter < firstFilter) { return { dateCompare: { message: 'Fecha final no puede ser menor a fecha inicial' } }; }
  }
  return null;
}

/**
 * Funcion que valida Fecha final y fecha inicial en controles filtroFechaHora
 * @param control de tipo AbstractControl para obtener el valor de los input para filtro
 * @returns if error retorna mensaje else null
 */
export function dateTimeValidation(control: AbstractControl) {
  const { firstFilter, secondFilter } = control.value;
  if ((firstFilter != null || firstFilter != undefined) && (secondFilter != null || secondFilter != undefined)) {
    if (secondFilter < firstFilter) { return { dateTimeCompare: { message: 'Fecha y hora final no puede ser menor a fecha y hora inicial' } }; }
  }
  return null;
}

/**
 * Funcion que valida valores numericos iniciales y finales en controles filtroNumero y filtroDecimal
 * @param control de tipo AbstractControl para obtener el valor de los input para filtro
 * @returns if error retorna mensaje else null
 */
export function numberValidation(control: AbstractControl) {
  const { firstFilter, secondFilter } = control.value;
  if ((firstFilter != null || firstFilter != undefined) && (secondFilter != null || secondFilter != undefined)) {
    if (secondFilter < firstFilter) { return { numberCompare: { message: 'Valor final no puede ser menor a valor inicial' } }; }
  }
  return null;
}

/**
 * Array para definir nombres de validators para formly
 */
const VALIDATORSMESSAGEFORM = [
  { name: 'timeCompare', validation: timeValidation },
  { name: 'dateCompare', validation: dateValidation },
  { name: 'dateTimeCompare', validation: dateTimeValidation },
  { name: 'numberCompare', validation: numberValidation }
]

@NgModule({
  declarations: [
    EditorTabularComponent,
    TablaDinamicaComponent,
    EditorEntidadComponent,
    BuscadorEntidadComponent,
    DatePickerComponent,
    DateTimePickerComponent,
    TimePickerComponent,
    PanelWrapperComponent,
    FiltroTextoComponent,
    FiltroDecimalComponent,
    FiltroEnteroComponent,
    FiltroFechaComponent,
    FiltroHoraComponent,
    FiltroFechaHoraComponent,
    FiltroLogicoComponent,
    FiltroTextoIndexadoComponent,
    FiltroListaSeleccionSimpleComponent,
    FiltroListaSeleccionMultipleComponent,
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzModalModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule.forRoot({
      validators: [...VALIDATORSMESSAGEFORM],
      validationMessages: [...VALIDATIONMESSAGESFORM],
      types: [...TYPESFORM],
      wrappers: [...WRAPPERSFORM],
    }),
    FormlyBootstrapModule,
    FormlyNgZorroAntdModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzSelectModule,
    NzIconModule,
    NzGridModule,
    AgGridModule,
    NzSpaceModule,
    TranslateModule.forRoot({}),
  ],
  exports: [
    EditorTabularComponent,
    TablaDinamicaComponent,
    EditorEntidadComponent,
    BuscadorEntidadComponent,
    FiltroTextoComponent
  ],
})
export class UiDinamicaModule { }
