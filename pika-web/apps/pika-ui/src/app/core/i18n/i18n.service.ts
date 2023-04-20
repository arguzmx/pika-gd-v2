import { Injectable } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import ngEs from "@angular/common/locales/es";
import { NzI18nService, es_ES as zorroEsEs } from "ng-zorro-antd/i18n";
import { es as dfEs } from "date-fns/locale";
import { es_ES as delonEsEs, AlainI18nBaseService, _HttpClient, SettingsService, DelonLocaleService } from "@delon/theme";
import { Platform } from "@angular/cdk/platform";
import { AlainConfigService } from "@delon/util/config";
import { Observable } from "rxjs";
import { registerLocaleData } from '@angular/common';

interface LangConfigData {
  abbr: string;
  text: string;
  ng: NzSafeAny;
  date: NzSafeAny;
  zorro: NzSafeAny
  delon: NzSafeAny;
}

const DEFAULT = 'es-ES'
const LANGS: { [key: string]: LangConfigData } = {
  'es-ES': {
    text: 'Español',
    ng: ngEs,
    zorro: zorroEsEs,
    date: dfEs,
    delon: delonEsEs,
    abbr: 'es'
  }
}

@Injectable({
  providedIn: 'root'
})
export class I18nService extends AlainI18nBaseService {

  protected override _defaultLang = DEFAULT
  private _langs = Object.keys(LANGS).map(code => {
    const item = LANGS[code];
    return { code, text: item.text, abbr: item.abbr }
  });

  constructor(
    private http: _HttpClient,
    private settings: SettingsService,
    private nzI18nService: NzI18nService,
    private delonLocaleService: DelonLocaleService,
    private platform: Platform,
    cogSrv: AlainConfigService
  ) {
    super(cogSrv);

    const defaultLang = this.getDafultLang()
    this._defaultLang = this._langs.findIndex(w => w.code === defaultLang) === -1 ? DEFAULT : defaultLang;
  }

  private getDafultLang(): string {
    if (!this.platform.isBrowser) {
      return DEFAULT
    }
    if (this.settings.layout.lang) {
      return this.settings.layout.lang
    }
    let res = (navigator.languages ? navigator.languages[0] : null) || navigator.language;
    const arr = res.split('-');
    return arr.length <= 1 ? res : `${arr[0]}-${arr[1].toUpperCase()}`;
  }

  loadLangData(lang: string): Observable<NzSafeAny> {
    return this.http.get(`assets/tmp/i18n/${lang}.json`)
  }

  use(lang: string, data: Record<string, unknown>): void {
    if (this._currentLang === lang) return;

    this._data = this.flatData(data, []);

    const item = LANGS[lang];
    registerLocaleData(item.ng);
    this.nzI18nService.setLocale(item.zorro)
    this.nzI18nService.setDateLocale(item.date)
    this.delonLocaleService.setLocale(item.delon)
    this._currentLang = lang
    this._change$.next(lang)
  }

  getLangs(): Array<{ code: string, text: string, abbr: string }> {
    return this._langs
  }

}
