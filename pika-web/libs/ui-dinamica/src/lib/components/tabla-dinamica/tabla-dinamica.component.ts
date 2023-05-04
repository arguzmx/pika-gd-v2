import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MetadatosService } from '../../services/metadatos.service';
import { Entidad } from '@pika-web/pika-cliente-api';
import { Observable } from 'rxjs';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'pika-web-tabla-dinamica',
  templateUrl: './tabla-dinamica.component.html',
  styleUrls: ['./tabla-dinamica.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablaDinamicaComponent implements OnInit {

  constructor(
    private metadataService: MetadatosService
  ) {
  }
  columnDefs = new Array
  rowData = new Array
  gridOptions$: Observable<GridOptions>
  entity: any
  activeLang: string = 'en'
  dic: any[] = [];
  obj: any
  gridOptions = {}

  ngOnInit(): void {
    this.entity = this.metadataService.ObtieneMetadatosEntidad("entidad-demo")
    this.obj = this.metadataService.getLang(this.entity, this.activeLang)
    this.setData()
  }

  setData() {
    this.entity.propiedades?.forEach((data: any, index: number) => {
      if (data.configuracionTabular?.mostrarEnTabla) {
        this.columnDefs.push({ field: this.obj[data.id] })
        this.rowData.push({ [this.obj[data.id!]]: data.valorDefault })
      }
    })
  }

}
