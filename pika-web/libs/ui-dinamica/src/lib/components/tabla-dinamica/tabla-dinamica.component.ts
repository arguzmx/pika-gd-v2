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
    private metadataService: MetadatosService
  ) { }

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
  cacheBlockSize: number | undefined = 11
  paginationPageSize: number | undefined = 11
  id: string = 'id'
  disableButton: boolean = true
  currentPage: number = 0
  tamano: number | undefined = 0

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

            data.elementos[10] = {
              "id": "251",
              "idLogico": false,
              "idListaSeleccionSimple": "B",
              "idFecha": "2023-05-13",
              "idFechaHora": "2023-05-13 19:19:25",
              "idHora": "19:19:25",
              "idDecimal": 5.5,
              "idEntero": {
                "value": 1024,
                "formato": "decimal 2"
              },
              "idListaSeleccionMultiple": "B,D",
              "idTexto": "John Lennon",
              "idTextoIndexado": "La vida es aquello que te va sucediendo mientras te empeñas en hacer otros planes"
            }


            this.totalKeys = Object.keys(data.elementos).length
            if (this.columnDefs.length < this.totalKeys) {
              for (var key in data.elementos[0]) { this.columnDefs.push({ field: key }) }
            }
            data.elementos.forEach((element: any) => {
              element.idFecha = element.idFecha.split('T')[0]
              element.idHora = element.idHora.split('T')[1]
              element.idFechaHora = element.idFechaHora.replace('T', ' ')
              if (typeof element.idEntero == 'object') {
                element.idEntero = this.valueFormater(element.idEntero)
              }

            })
            this.gridApi.setColumnDefs(this.columnDefs)
            params.successCallback(data.elementos, data.total)
          })
      }
    }
    this.gridApi.setDatasource(dataSourceVar)
  }

  valueFormater(value: any) {
    if (value.formato == "decimal 2") {
      return (value.value).toFixed(2)
    } else if (value.formato == "decimal 4") {
      return (value.value).toFixed(4)
    } else if (value.formato == "bytes") {
      return this.formatBytes(value.value)
    } else if (value.formato == "moneda") {
      //to define currency format with Intl.NumberFormat
      //return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(value.value)
      return "$ " + value.value
    } else if (value.formato == 'porcentaje') {
      return value.value + " %"
    }
    return value.value
  }

  formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
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
