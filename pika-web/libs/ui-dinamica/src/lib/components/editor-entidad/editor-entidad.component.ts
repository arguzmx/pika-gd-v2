import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { MetadatosService } from '../../services/metadatos.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { OrdenamientoLista, TipoDatos } from '@pika-web/pika-cliente-api';
import { InformationService } from '../../services/information.service';

@Component({
  selector: 'pika-web-editor-entidad',
  templateUrl: './editor-entidad.component.html',
  styleUrls: ['./editor-entidad.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorEntidadComponent implements OnChanges {

  @Input() createOrUpdateEntity: string;
  @Input() isVisible: boolean
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() sendEntityData = new EventEmitter<object>();

  fields: FormlyFieldConfig[] = []
  subFields: FormlyFieldConfig[] = []
  form = new FormGroup({})
  model: any = {}
  selectOptions: any = []
  deviceType: string = ''
  value: any

  //antcol debera ser reornado desde fuera para definir columnas
  antCol: string = "ant-col-8"

  subtypeForm: string = ''
  haveSubtype: boolean = false
  isMultiSelect: boolean = false
  formValue: any
  nzSize: any
  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false
    },
  };

  constructor(
    private metadataService: MetadatosService,
    private infoService: InformationService
  ) { }

  ngOnChanges(): void {
    try {
      let entity = this.metadataService.ObtieneMetadatosEntidad("entidad-demo")
      this.deviceType = this.infoService.getOS()
      this.fields.push({
        fieldGroupClassName: 'ant-row',
        fieldGroup: this.setFormProps(entity)
      })
    } catch (error) {
      console.log(error);
    }
  }

  handleCancel() {
    this.isVisible = false
    this.clearFormFieldArrays()
    this.isVisibleChange.emit(false)
  }

  sendData() {
    this.sendEntityData.emit(this.model)
    this.clearFormFieldArrays()
    this.handleCancel()
  }

  clearFormFieldArrays() {
    this.fields = []
    this.subFields = []
  }

  editEntity() {
    console.log("editar entidad");
  }

  updateEntity() {
    console.log("actualizar entidad");
  }

  defineSize() {
    if (this.deviceType == 'desktop') {
      this.nzSize = 75
      return this.nzSize
    }
    return null
  }

  setFormProps(entity: any) {
    if (this.isVisible) {
      try {
        entity.propiedades?.forEach((data: any, index: number) => {
          this.subFields.push({
            key: data.id,
            type: this.defineFormProperties(data.tipo, data.valorDefault),
            defaultValue: this.value,
            props: { label: data.nombre, required: data.requerida },
            wrappers: ['panel'],
            templateOptions: { required: data.requerida, label: data.nombre }
          })
          if (this.haveSubtype) { this.subFields[index].props!.type = this.subtypeForm }
          if (this.isMultiSelect) { this.subFields[index].props!['multiple'] = true }
          if (data.validadorNumerico) {
            this.subFields[index].props!.min = data.validadorNumerico.minimo
            this.subFields[index].props!.max = data.validadorNumerico.maximo
          }
          if (data.tipo.includes('Lista')) {
            this.selectOptions = []
            let sortedOptionsArray
            switch (data.lista.ordenamiento) {
              case OrdenamientoLista.Ninguno: sortedOptionsArray = data.lista.elementos.sort((a: any, b: any) => (a.posicion > b.posicion) ? 1 : (a.posicion < b.posicion) ? -1 : 0)
                break;
              case OrdenamientoLista.Alfabetico: sortedOptionsArray = this.sortArray(data)
                break;
              case OrdenamientoLista.Numerico: sortedOptionsArray = this.sortArray(data)
                break;
            }
            sortedOptionsArray.forEach((element: any) => { this.selectOptions.push({ value: element.valor, label: element.nombre }) })
            this.subFields[index].props!.options = this.selectOptions
          }
          if (data.validadorFecha) {
            this.subFields[index].props!.min = data.validadorFecha.minimo
            this.subFields[index].props!.max = data.validadorFecha.maximo
          }
          if (this.deviceType === "desktop") {
            this.subFields[index].className = 'ant-col-8'
          } else if (this.deviceType === "android" || this.deviceType === 'ios') {
            this.subFields[index].className = 'ant-col-24'
          }
        })
        return this.subFields || []
      } catch (error) {
        console.log(error);
      }
    }
    return []
  }

  sortArray(data: any) {
    return data.lista.elementos.sort((a: any, b: any) => a.nombre.localeCompare(b.nombre))
  }

  defineFormProperties(type: string, defaultValue: string) {
    let formType: any = ''
    this.subtypeForm = ''
    this.haveSubtype = false
    this.isMultiSelect = false
    this.value = ''
    switch (type) {
      case TipoDatos.Logico:
        formType = 'checkbox'
        this.value = defaultValue == 'true' ? true : false
        break;
      case TipoDatos.ListaSeleccionSimple:
        formType = 'select'
        this.value = defaultValue
        break;
      case TipoDatos.Fecha:
        formType = "customDate"
        let newDate = defaultValue.split('"')[1]
        this.value = new Date(newDate)
        break;
      case TipoDatos.FechaHora:
        let newDateTime = defaultValue.split('"')[1]
        formType = 'customDateTime'
        this.value = new Date(newDateTime)
        break;
      case TipoDatos.Decimal:
        formType = 'number'
        this.value = defaultValue
        break;
      case TipoDatos.Entero:
        formType = 'number'
        this.value = defaultValue
        break;
      case TipoDatos.Hora:
        formType = 'customTime'
        let newTime = defaultValue.split('"')[1]
        this.value = new Date(newTime)
        break;
      case TipoDatos.ListaSeleccionMultiple:
        formType = 'select'
        this.isMultiSelect = true
        this.value = [defaultValue]
        break;
      case TipoDatos.Texto:
        formType = 'input'
        this.value = defaultValue
        break;
      case TipoDatos.TextoIndexado:
        formType = 'textarea'
        this.value = defaultValue
        break;
    }
    return formType
  }


}
