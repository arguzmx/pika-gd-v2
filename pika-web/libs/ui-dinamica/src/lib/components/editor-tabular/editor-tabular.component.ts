import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MetadatosService } from '../../services/metadatos.service';

@Component({
  selector: 'pika-web-editor-tabular',
  templateUrl: './editor-tabular.component.html',
  styleUrls: ['./editor-tabular.component.less'],
  providers: [MetadatosService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorTabularComponent implements OnInit {

  createOrUpdateEntity: string = "create"
  isVisible: boolean = false
  entityData: object = {}
  rowInfo: any
  entity: any;
  fromApi: boolean = false;

  constructor(
    private metadataService: MetadatosService,
  ) {

  }

  ngOnInit(): void {
    this.getMetadata();
  }

  showEntityEdit() {
    this.isVisible = true;
    this.fromApi = true;
  }

  getMetadata() {
    this.entity = this.metadataService.ObtieneMetadatosEntidad("entidad-demo")
    console.log(this.entity);
  }

  isVisibleChange($event: boolean) {
    this.isVisible = $event
  }

  recieveEntityData($event: object) {
    this.entityData = $event
  }

}
