import { ChangeDetectionStrategy, Component, ComponentRef, OnChanges, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FiltroTextoComponent } from './filtros/filtro-texto/filtro-texto.component';
import { MetadatosService } from '../../services/metadatos.service';
import { TipoDatos } from '@pika-web/pika-cliente-api';
import { FiltroDecimalComponent } from './filtros/filtro-decimal/filtro-decimal.component';
import { FiltroEnteroComponent } from './filtros/filtro-entero/filtro-entero.component';
import { FiltroFechaComponent } from './filtros/filtro-fecha/filtro-fecha.component';
import { FiltroFechaHoraComponent } from './filtros/filtro-fecha-hora/filtro-fecha-hora.component';
import { FiltroHoraComponent } from './filtros/filtro-hora/filtro-hora.component';
import { FiltroListaSeleccionMultipleComponent } from './filtros/filtro-lista-seleccion-multiple/filtro-lista-seleccion-multiple.component';
import { FiltroListaSeleccionSimpleComponent } from './filtros/filtro-lista-seleccion-simple/filtro-lista-seleccion-simple.component';
import { FiltroLogicoComponent } from './filtros/filtro-logico/filtro-logico.component';
import { FiltroTextoIndexadoComponent } from './filtros/filtro-texto-indexado/filtro-texto-indexado.component';

@Component({
  selector: 'pika-web-buscador-entidad',
  templateUrl: './buscador-entidad.component.html',
  styleUrls: ['./buscador-entidad.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuscadorEntidadComponent {
  @ViewChild('viewContainerRef', { read: ViewContainerRef }) container: ViewContainerRef;


  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  entity: any
  propertis: any[] = []
  child_unique_key: any
  exixtsId: any[] = []

  componentReferences = Array<ComponentRef<any>>()

  constructor(private metadataService: MetadatosService) { }

  fields: FormlyFieldConfig[] = [
    {
      key: 'propiedad',
      type: 'select',
      props: {
        placeholder: 'Seleccione un tipo de dato',
        label: 'Propiedad',
        options: this.getMetadata(),
        change: (field, $event) => {
          field.props!.options = this.propertis
        }
      },
    }
  ]

  getMetadata() {
    this.entity = this.metadataService.ObtieneMetadatosEntidad("entidad-demo")
    this.entity.propiedades.forEach((element: any) => {
      if (element.buscable) {
        this.propertis.push({ label: element.nombre, value: element.valorDefault, tipoDato: element.tipo, id: element.id })
      }
    });
    return this.propertis
  }

  addFilter(event: any): void {
    var filter;
    var filterName: string = ""
    this.propertis.forEach((element: any, index: number) => {
      if (event.propiedad == element.value) {
        filterName = element.label
        filter = element.tipoDato
        this.child_unique_key = element.id
      }
    })

    if (filter != undefined) {
      switch (filter) {
        case TipoDatos.Decimal:
          filter = FiltroDecimalComponent
          break;
        case TipoDatos.Entero:
          filter = FiltroEnteroComponent
          break;
        case TipoDatos.Fecha:
          filter = FiltroFechaComponent
          break;
        case TipoDatos.FechaHora:
          filter = FiltroFechaHoraComponent
          break;
        case TipoDatos.Hora:
          filter = FiltroHoraComponent
          break;
        case TipoDatos.ListaSeleccionMultiple:
          filter = FiltroListaSeleccionMultipleComponent
          break;
        case TipoDatos.ListaSeleccionSimple:
          filter = FiltroListaSeleccionSimpleComponent
          break;
        case TipoDatos.Logico:
          filter = FiltroLogicoComponent
          break;
        case TipoDatos.Texto:
          filter = FiltroTextoComponent
          break;
        case TipoDatos.TextoIndexado:
          filter = FiltroTextoIndexadoComponent
          break;
      }
      var expComponent = this.container.createComponent(filter);
      expComponent.instance.nombreComponente = filterName
      expComponent.instance._ref = expComponent;
      this.componentReferences.push(expComponent)

    }
  }

  // removeComponent(key: any) {

  //   if (this.container.length < 1) return;

  //   let componentRef = this.componentReferences.filter(
  //     x => x.instance.unique_key == key
  //   )[0];

  //   let vcrIndex: number = this.container.indexOf(componentRef.instance.unique_key);
  //   this.container.remove(vcrIndex);

  //   this.componentReferences = this.componentReferences.filter(
  //     x => x.instance.unique_key !== key
  //   );
  // }
}
