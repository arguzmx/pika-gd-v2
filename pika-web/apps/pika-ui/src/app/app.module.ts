import { LOCALE_ID, NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { default as ngLang } from "@angular/common/locales/es";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './routes/routes.module';
import { LayoutModule } from './layout/layout.module';
import { DELON_LOCALE, ALAIN_I18N_TOKEN, es_ES as delongLang } from "@delon/theme";
import { I18nService } from "./core";
import { CoreModule } from './core/core.module';
import { NZ_DATE_LOCALE, NZ_I18N, es_ES as zorroLang } from 'ng-zorro-antd/i18n';
import { es as dateLang } from "date-fns/locale";
import { StartupService } from "./core";
import { Observable } from "rxjs";
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { GlobalConfigModule } from './global-config.module';

const LANG = {
  abbr: 'zh',
  ng: ngLang,
  zorro: zorroLang,
  date: dateLang,
  delon: delongLang
}

registerLocaleData(LANG.ng, LANG.abbr);
const LANG_PROVIDES = [
  { provide: LOCALE_ID, useValue: LANG.abbr },
  { provide: NZ_I18N, useValue: LANG.zorro },
  { provide: NZ_DATE_LOCALE, useValue: LANG.date },
  { provide: DELON_LOCALE, useValue: LANG.delon }
]

const I18NSERVICE_PROVIDERS = [{ provide: ALAIN_I18N_TOKEN, useClass: I18nService, multi: false }]

export function StartupServiceFactory(startupService: StartupService): () => Observable<void> {
  return () => startupService.load();
}
const APPINIT_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true
  }
]

@NgModule({
  declarations: [AppComponent],
  imports: [
    NzButtonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    GlobalConfigModule.forRoot(),
    BrowserAnimationsModule,
    SharedModule,
    LayoutModule,
    RoutesModule,
    CoreModule,
    NzNotificationModule
  ],
  providers: [
    // { provide: NZ_I18N, useValue: es_ES }
    ...LANG_PROVIDES, ...I18NSERVICE_PROVIDERS, ...APPINIT_PROVIDES
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
