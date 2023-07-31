import { ChangeDetectionStrategy, Component, ComponentRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { FiltroTextoComponent } from './filtros/filtro-texto/filtro-texto.component';
import { MetadatosService } from '../../services/metadatos.service';
import { Consulta, Filtro, TipoDatos } from '@pika-web/pika-cliente-api';
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
export class BuscadorEntidadComponent implements OnInit {
  @ViewChild('viewContainerRef', { read: ViewContainerRef }) container: ViewContainerRef;

  @Input() entity: any;

  selectedFilter: string;
  propertis: any[] = []
  child_unique_key: string
  listOfSelectedFilters: string[] = []
  unusedFilters: any[] = []
  componentRef: ComponentRef<any>;
  components: any[] = [];
  consulta: Consulta;
  filtros: Array<Filtro> = [];

  constructor() { }

  ngOnInit(): void {
    this.getMetadata();
  }

  getMetadata() {
    this.entity.propiedades.forEach((element: any) => {
      if (element.buscable) {
        this.propertis.push({ label: element.nombre, value: element.id, tipoDato: element.tipo })
      }
    });
  }

  /**
   * Función que agrega filtros dinamicos en base a lo que recibe de nz-select
   * @param event evento de nz-select
   */
  addFilter(event: any): void {
    var filter;
    var filterName: string = ""
    this.propertis.forEach((element: any, index: number) => {
      if (event == element.value) {
        filterName = element.label
        filter = element.tipoDato
        this.child_unique_key = element.value
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
      this.componentRef = this.container.createComponent(filter);
      this.componentRef.instance.nombreComponente = filterName
      this.componentRef.instance._ref = this.componentRef;
      this.componentRef.instance.childUniqueKey = this.child_unique_key
      this.componentRef.instance.parentRef = this;
      this.components.push(this.componentRef)
      this.listOfSelectedFilters.push(this.selectedFilter)
    }
  }

  isSelected(option: any): boolean {
    return this.listOfSelectedFilters.includes(option.value)
  }

  isNotSelected(key: string) {
    this.listOfSelectedFilters.forEach((element, index: number) => {
      if (key == element) {
        this.listOfSelectedFilters.splice(index, 1)
        this.components.splice(index, 1)
      }
    });
  }

  /**
   * Función que carga los datos contenidos en los filtros
   */
  loadFiltersData() {
    this.filtros.splice(0, this.filtros.length)
    this.components.map((compRef: ComponentRef<any>) => {
      this.filtros.push(compRef.instance.ObtenerFiltro())
    })
    this.consulta = {
      id: 'id-prueba',
      paginado: {
        indice: 1,
        tamano: 10
      },
      filtros: this.filtros
    }
    console.log("consulta", this.consulta);
  }

}
