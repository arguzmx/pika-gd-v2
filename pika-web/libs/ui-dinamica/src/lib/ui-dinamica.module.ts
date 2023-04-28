import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorTabularComponent } from './components/editor-tabular/editor-tabular.component';
import { TablaDinamicaComponent } from './components/tabla-dinamica/tabla-dinamica.component';
import { EditorEntidadComponent } from './components/editor-entidad/editor-entidad.component';
import { BuscadorEntidadComponent } from './components/buscador-entidad/buscador-entidad.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { NzGridModule } from "ng-zorro-antd/grid";
import { AgGridModule } from "ag-grid-angular";
import { NzSpaceModule } from "ng-zorro-antd/space";

const TYPESFORM = [
  { name: 'customDate', wrappers: ['form-field'] },
  { name: 'customDate', component: DatePickerComponent },
  { name: 'customTime', wrappers: ['form-field'] },
  { name: 'customTime', component: TimePickerComponent },
  { name: 'customDateTime', wrappers: ['form-field'] },
  { name: 'customDateTime', component: DateTimePickerComponent },
];

const VALIDATIONMESSAGESFORM = [
  { name: 'required', message: 'El campo es requerido' },
];

const WRAPPERSFORM = [
  { name: 'panel', component: PanelWrapperComponent }
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
    PanelWrapperComponent
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzModalModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule.forRoot({ validationMessages: [...VALIDATIONMESSAGESFORM], types: [...TYPESFORM], wrappers: [...WRAPPERSFORM] }),
    FormlyBootstrapModule,
    FormlyNgZorroAntdModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzSelectModule,
    NzGridModule,
    AgGridModule,
    NzSpaceModule
  ],
  exports: [
    EditorTabularComponent,
    TablaDinamicaComponent,
    EditorEntidadComponent,
    BuscadorEntidadComponent,
  ],
})
export class UiDinamicaModule { }
