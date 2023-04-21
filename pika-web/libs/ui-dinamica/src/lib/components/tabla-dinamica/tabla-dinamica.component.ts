import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pika-web-tabla-dinamica',
  templateUrl: './tabla-dinamica.component.html',
  styleUrls: ['./tabla-dinamica.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablaDinamicaComponent {}
