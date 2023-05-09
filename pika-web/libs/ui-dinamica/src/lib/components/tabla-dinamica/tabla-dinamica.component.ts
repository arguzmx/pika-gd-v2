import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MetadatosService } from '../../services/metadatos.service';
import { firstValueFrom, take } from 'rxjs';
import { ColDef, FirstDataRenderedEvent, GridApi } from 'ag-grid-community';
import { TranslateService } from "@ngx-translate/core";
import { EntidadMockPagina } from '@pika-web/pika-cliente-api';

@Component({
  selector: 'pika-web-tabla-dinamica',
  templateUrl: './tabla-dinamica.component.html',
  styleUrls: ['./tabla-dinamica.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablaDinamicaComponent implements OnInit {

  constructor(
    private metadataService: MetadatosService,
    private translate: TranslateService,
    private ref: ChangeDetectorRef
  ) {
  }
  private gridApi: GridApi
  columnDefs = new Array
  rowData = new Array
  entity: any
  activeLang: string = 'es'
  dic: any[] = [];
  obj: any
  totalKeys: number = 0
  tableEntity: any
  paginationPageSize: number = 0
  gridOptions = {}

  localeEs: any = {
    page: 'Pagina',
    of: 'de',
    to: 'a'
  }

  ngOnInit() {
    //this.entity = this.metadataService.ObtieneMetadatosEntidad("entidad-demo")
    //this.obj = this.metadataService.getLang(this.entity, this.activeLang)
    //this.setData()
    this.getData()

    // this.gridOptions = {
    //   //localeTextFunc: (key: string, defaultValue: string) => this.setLang()[key] || defaultValue
    //   pagination: true,
    //   columnDefs: [
    //     { field: '1' },
    //     { field: '2' }
    //   ],
    //   localeTextFunc: (key: string, defaultValue: string) => {
    //     if (Object.keys(this.localeEs).includes(key)) {
    //       const data = this.translate.instant(this.localeEs[key]);
    //       return data === key ? defaultValue : data;
    //     }
    //   },
    //   stopEditingWhenGridLosesFoces: true
    //   //rowModelType: 'infinite'
    // }

  }


  setLang() {
    if (this.activeLang == 'es') {
      return this.localeEs
    }
  }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    console.log(this.tableEntity.paginado.indice);

    params.api.paginationGoToPage(this.tableEntity.paginado.indice);
  }

  getData() {
    let entityTable
    const res = this.metadataService.ObtieneMetadatosTabla().subscribe(res => {
      this.ref.detectChanges()
      this.gridOptions = {
        //localeTextFunc: (key: string, defaultValue: string) => this.setLang()[key] || defaultValue
        pagination: true,
        columnDefs: [
          { field: '1' },
          { field: '2' }
        ],
        localeTextFunc: (key: string, defaultValue: string) => {
          if (Object.keys(this.localeEs).includes(key)) {
            const data = this.translate.instant(this.localeEs[key]);
            return data === key ? defaultValue : data;
          }
        },
        stopEditingWhenGridLosesFoces: true
        //rowModelType: 'infinite'
      }
    })
    //entityTable = await firstValueFrom(res)
    //this.setData(entityTable)
  }

  setData(entityTable: any) {
    console.log("value in setdata", entityTable);

    //this.tableEntity = this.metadataService.ObtieneMetadatosTabla()
    //Aconsole.log(this.tableEntity);

    this.paginationPageSize = entityTable.paginado.tamano
    entityTable.elementos.forEach((data: any, index: number) => {
      this.totalKeys = Object.keys(data).length
      if (this.columnDefs.length < this.totalKeys) {
        for (var key in data) {
          this.columnDefs.push({ field: key })
        }
      }
      entityTable.elementos[index].idFecha = entityTable.elementos[index].idFecha.split('T')[0]
      entityTable.elementos[index].idHora = entityTable.elementos[index].idHora.split('T')[1]
      entityTable.elementos[index].idFechaHora = entityTable.elementos[index].idFechaHora.replace('T', ' ')
      this.rowData.push(data)
    })
    this.gridApi.refreshCells()
  }

  public defaultColDef: ColDef = {
    minWidth: 5,
    resizable: true
  }

}
