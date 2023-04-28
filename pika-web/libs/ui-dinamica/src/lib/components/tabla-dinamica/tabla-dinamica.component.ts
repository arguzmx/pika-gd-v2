import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MetadatosService } from '../../services/metadatos.service';
import { Entidad } from '@pika-web/pika-cliente-api';
import { Observable } from 'rxjs';
import { GridOptions } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pika-web-tabla-dinamica',
  templateUrl: './tabla-dinamica.component.html',
  styleUrls: ['./tabla-dinamica.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablaDinamicaComponent implements OnInit {

  constructor(private metadataService: MetadatosService, private http: HttpClient) { }

  columnDefs = new Array
  rowData = new Array
  gridOptions$: Observable<GridOptions>

  ngOnInit(): void {
    let entity = this.metadataService.ObtieneMetadatosEntidad("entidad-demo")
    this.setData(entity)
  }

  setData(entity: Entidad) {
    entity.propiedades?.forEach(data => {
      if (data.configuracionTabular?.mostrarEnTabla) {
        this.columnDefs.push({ field: data.nombre })
        this.rowData.push({ [data.nombre!]: data.valorDefault })
      }
    })
  }

}
