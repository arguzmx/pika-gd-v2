import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  METADATOS_API_BASE_URL,
  MetadatosClient,
} from '@pika-web/pika-cliente-api';

registerLocaleData(es);

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    NzButtonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },
    MetadatosClient,
    {
      provide: METADATOS_API_BASE_URL,
      useValue: 'https://localhost:7001',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
