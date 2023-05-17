import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MetadatosService } from '../../services/metadatos.service';
import { Observable, firstValueFrom, of, take } from 'rxjs';
import { ColDef, FirstDataRenderedEvent, GetRowIdFunc, GetRowIdParams, GridApi, GridOptions, IDatasource, IGetRowsParams, SelectionChangedEvent, PaginationNumberFormatterParams, PaginationChangedEvent, GridOptionsService } from 'ag-grid-community';
import { TranslateService } from "@ngx-translate/core";
import { EntidadMock, EntidadMockPagina, TipoDatos } from '@pika-web/pika-cliente-api';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'pika-web-tabla-dinamica',
  templateUrl: './tabla-dinamica.component.html',
  styleUrls: ['./tabla-dinamica.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablaDinamicaComponent implements OnInit {

  constructor(
    private metadataService: MetadatosService,
    private cd: ChangeDetectorRef,

  ) {

  }

  gridApi: GridApi
  columnDefs = new Array
  rowData = new Array
  entity: any
  activeLang: string = 'es'
  dic: any[] = [];
  obj: any
  totalKeys: number = 0
  tableEntity: EntidadMockPagina
  isVisible: boolean = false
  selectedData: any
  numberPage: number | undefined = 0
  agGridParams: AgGridAngular
  gridColumnApi: any;
  cacheBlockSize: number | undefined = 10
  paginationPageSize: number | undefined = 10

  dataTable: any
  id: string = 'id'
  disableButton: boolean = true
  currentPage: number = 0


  body = {
    "id": "string",
    "paginado": {
      "indice": this.numberPage,
      "tamano": 10
    }
  }

  gridOptions: GridOptions = {
    rowModelType: 'infinite',
    paginationPageSize: this.paginationPageSize,
    cacheBlockSize: this.cacheBlockSize
  }

  tamano: number | undefined = 0

  localeEs: any = {
    page: 'Pagina',
    of: 'de',
    to: 'a'
  }

  ngOnInit() {
  }

  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.id

  setLang() {
    if (this.activeLang == 'es') {
      return this.localeEs
    }
  }

  onPaginationChanged($event: PaginationChangedEvent) {

  }


  public defaultColDef: ColDef = {
    minWidth: 5,
    resizable: true
  }

  receiveNewData($event: EntidadMock) {
    let i: number = 0
    let newDate
    let newDateTime
    let newTime
    const rowNode = this.gridApi.getRowNode($event.id!)
    for (var k in $event) {
      let val = Object.values($event)[i]
      if (k == this.id + TipoDatos.Fecha) {
        newDate = val.toISOString().split('T')[0]
        val = newDate
      } else if (k == this.id + TipoDatos.FechaHora) {
        newDateTime = (val.getFullYear() + '-' + ('0' + (val.getMonth() + 1)).slice(-2) + '-' + ('0' + val.getDate()).slice(-2)) + ' ' + val.getHours() + ':' + val.getMinutes() + ':' + val.getSeconds()
        val = newDateTime
      } else if (k == this.id + TipoDatos.Hora) {
        newTime = val.getHours() + ':' + val.getMinutes() + ':' + val.getSeconds()
        val = newTime
      }
      rowNode!.setDataValue(k, val)
      i++
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi

    var dataSourceVar = {
      getRows: (params: IGetRowsParams) => {
        this.body.paginado.indice = this.gridApi.paginationGetCurrentPage()
        this.metadataService.dataTable(this.body)
          .subscribe((data: any) => {
            this.totalKeys = Object.keys(data.elementos).length
            if (this.columnDefs.length < this.totalKeys) {
              for (var key in data.elementos[0]) { this.columnDefs.push({ field: key }) }
            }
            data.elementos.forEach((element: any) => {
              element.idFecha = element.idFecha.split('T')[0]
              element.idHora = element.idHora.split('T')[1]
              element.idFechaHora = element.idFechaHora.replace('T', ' ')
            })
            this.gridApi.setColumnDefs(this.columnDefs)
            params.successCallback(data.elementos, data.total)
          })
      }
    }
    this.gridApi.setDatasource(dataSourceVar)
  }

  shareInfo() {
    this.selectedData = this.gridApi.getSelectedRows()
    this.isVisible = true
  }

  isVisibleChange($event: boolean) {
    this.isVisible = $event
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    const selectedData = this.gridApi.getSelectedRows();
    if (selectedData) {
      this.disableButton = false
    }
  }

}
