import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorTabularComponent } from './components/editor-tabular/editor-tabular.component';
import { TablaDinamicaComponent } from './components/tabla-dinamica/tabla-dinamica.component';
import { EditorEntidadComponent } from './components/editor-entidad/editor-entidad.component';
import { BuscadorEntidadComponent } from './components/buscador-entidad/buscador-entidad.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    EditorTabularComponent,
    TablaDinamicaComponent,
    EditorEntidadComponent,
    BuscadorEntidadComponent,
  ],
  exports: [
    EditorTabularComponent,
    TablaDinamicaComponent,
    EditorEntidadComponent,
    BuscadorEntidadComponent,
  ],
})
export class UiDinamicaModule {}
