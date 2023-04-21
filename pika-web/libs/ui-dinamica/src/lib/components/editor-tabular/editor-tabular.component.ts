import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MetadatosService } from '../../services/metadatos.service';

@Component({
  selector: 'pika-web-editor-tabular',
  templateUrl: './editor-tabular.component.html',
  styleUrls: ['./editor-tabular.component.less'],
  providers: [MetadatosService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorTabularComponent {}
