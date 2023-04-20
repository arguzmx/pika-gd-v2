import { Component, OnInit } from '@angular/core';
import { MetadatosClient, Propiedad } from '@pika-web/pika-cliente-api';

@Component({
  selector: 'pika-web-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [MetadatosClient],
})
export class AppComponent implements OnInit {
  title = 'pika-ui';

  constructor(private metadatos: MetadatosClient) {}

  propiedades: Propiedad[] | undefined = [];

  ngOnInit() {
    this.metadatos.entidad('demo').subscribe(
      (r) => {
        this.propiedades = r.propiedades;
        console.log(r);
      },
      (ex) => {
        console.log(ex);
      }
    );
    console.log('init');
  }
}
