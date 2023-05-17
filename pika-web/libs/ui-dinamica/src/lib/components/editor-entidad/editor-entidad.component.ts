import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { MetadatosService } from '../../services/metadatos.service';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { OrdenamientoLista, TipoDatos } from '@pika-web/pika-cliente-api';
import { InformationService } from '../../services/information.service';
import { TranslateService } from '@ngx-translate/core';
import { startWith, tap } from 'rxjs';

@Component({
  selector: 'pika-web-editor-entidad',
  templateUrl: './editor-entidad.component.html',
  styleUrls: ['./editor-entidad.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorEntidadComponent implements OnChanges {

  @Input() createOrUpdateEntity: string;
  @Input() isVisible: boolean
  @Input() rowData: any
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() sendEntityData = new EventEmitter<object>();


  fields: FormlyFieldConfig[] = []
  subFields: FormlyFieldConfig[] = []
  form = new FormGroup({})
  model: any = {}
  selectOptions: any = []
  deviceType: string = ''
  value: any
  activeLang = 'es'
  entity: any
  id: string = 'id'

  //antcol debera ser retornado desde fuera para definir columnas
  antCol: string = "ant-col-8"
  a: any

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

  dic: any[] = [];
  obj: any
  immutableStore: any[] = [];

  constructor(
    private metadataService: MetadatosService,
    private infoService: InformationService,
    public translate: TranslateService
  ) {
    this.translate.setDefaultLang(this.activeLang)
  }

  ngOnChanges(): void {
    if (this.isVisible) {


      // Build form with api data

      // try {
      //   this.entity = this.metadataService.ObtieneMetadatosEntidad("entidad-demo")
      //   this.deviceType = this.infoService.getOS()
      //   this.fields.push({
      //     fieldGroupClassName: 'ant-row',
      //     fieldGroup: this.setFormProps(this.entity)
      //   })
      //   this.obj = this.metadataService.getLang(this.entity, this.activeLang)
      //   this.translate.setTranslation(this.activeLang, this.obj)
      // } catch (error) {
      //   console.log(error);
      // }


      // data from table
      try {
        this.form = new FormGroup({})
        this.form.reset()
        this.deviceType = this.infoService.getOS()
        this.fields.push({
          fieldGroupClassName: 'ant-row',
          fieldGroup: this.setFormPropsFromTable(this.rowData)
        })
      } catch (error) {
        console.log(error);
      }
    }
  }

  setFormPropsFromTable(data: any) {
    if (this.isVisible) {
      data.forEach((element: any, index: number) => {
        let i = 0
        for (var k in element) {
          this.subFields.push({
            key: k,
            type: this.defineFormProperties(k, element[k]),
            defaultValue: this.value,
            hooks: {
              onChanges: (f) => {
                f.formControl!.setValue(f.defaultValue)
              }
            },
            wrappers: ['panel'],
            props: {
              label: k
            }
          })
          this.subFields[0].props!.readonly = true
          if (k == this.id + TipoDatos.ListaSeleccionSimple) {
            this.selectOptions = []
            this.selectOptions.push({ value: element[k], label: element[k] })
            this.subFields[i].props!.options = this.selectOptions
          } else if (k == this.id + TipoDatos.ListaSeleccionMultiple) {
            this.selectOptions = []
            if (element[k].includes(',')) {
              let values = element[k].split(',')
              values.forEach((val: any) => {
                this.selectOptions.push({ value: val, label: val })
              })
            } else {
              this.selectOptions.push({ value: element[k], label: element[k] })
            }
            this.subFields[i].props!.options = this.selectOptions
          }
          if (this.isMultiSelect) { this.subFields[i].props!['multiple'] = true }
          this.setAntCol(i)
          i++
        }

      })
      return this.subFields || []
    }
    return []
  }

  addTotal(): void {
    this.form.setValue(this.subFields)
  }

  setAntCol(index: number) {
    if (this.deviceType === "desktop") {
      return this.subFields[index].className = 'ant-col-8'
    } else if (this.deviceType === "android" || this.deviceType === 'ios') {
      return this.subFields[index].className = 'ant-col-24'
    }
    return ''
  }

  handleCancel() {
    this.isVisible = false
    this.clearFormFieldArrays()
    this.isVisibleChange.emit(false)
  }


  sendData() {
    this.sendEntityData.emit(this.form.value)
    this.clearFormFieldArrays()
    this.handleCancel()
  }

  clearFormFieldArrays() {
    this.fields = []
    this.subFields = []
    this.form = new FormGroup({})

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
            props: { label: data.id, required: data.requerida },
            wrappers: ['panel'],
            templateOptions: { required: data.requerida }
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
          this.setAntCol(index)
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
    if (type == TipoDatos.Logico || type == this.id + TipoDatos.Logico) {
      formType = 'checkbox'
      this.value = defaultValue == 'true' ? true : false || defaultValue ? true : false
    } else if (type == TipoDatos.ListaSeleccionSimple || type == this.id + TipoDatos.ListaSeleccionSimple) {
      formType = 'select'
      this.value = defaultValue
    } else if (type == TipoDatos.Fecha || type == this.id + TipoDatos.Fecha) {
      formType = "customDate"
      if (defaultValue.includes('T')) {
        let newDate = defaultValue.split('"')[1]
        this.value = new Date(newDate)
      } else {
        defaultValue = defaultValue.replace(/-/g, '/')
        this.value = new Date(defaultValue)
      }
    } else if (type == TipoDatos.FechaHora || type == this.id + TipoDatos.FechaHora) {
      formType = 'customDateTime'
      if (defaultValue.includes('T')) {
        let newDateTime = defaultValue.split('"')[1]
        this.value = new Date(newDateTime)
      } else {
        this.value = new Date(defaultValue)
      }
    } else if (type == TipoDatos.Decimal || type == this.id + TipoDatos.Decimal) {
      formType = 'number'
      this.value = defaultValue
    } else if (type == TipoDatos.Entero || type == this.id + TipoDatos.Entero) {
      formType = 'number'
      this.value = defaultValue
    } else if (type == TipoDatos.Hora || type == this.id + TipoDatos.Hora) {
      formType = 'customTime'
      let newTime
      if (defaultValue.includes('T')) {
        newTime = defaultValue.split('"')[1]
        this.value = new Date(newTime)
      } else {
        newTime = this.toTime(defaultValue)
        this.value = new Date(newTime)
      }
    } else if (type == TipoDatos.ListaSeleccionMultiple || type == this.id + TipoDatos.ListaSeleccionMultiple) {
      formType = 'select'
      let values
      this.isMultiSelect = true
      if (defaultValue.includes(',')) {
        values = defaultValue.split(',')
        this.value = values
      } else {
        this.value = [defaultValue]
      }
    } else if (type == TipoDatos.Texto || type == this.id + TipoDatos.Texto) {
      formType = 'input'
      this.value = defaultValue
    } else if (type == TipoDatos.TextoIndexado || type == this.id + TipoDatos.TextoIndexado) {
      formType = 'textarea'
      this.value = defaultValue
    } else {
      formType = 'input'
      this.value = defaultValue
    }
    return formType
  }

  toTime(timeString: any) {
    var timeTokens = timeString.split(':');
    return new Date(1970, 0, 1, timeTokens[0], timeTokens[1], timeTokens[2]);
  }


}
