import { Inject, Injectable } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';
import { ALAIN_I18N_TOKEN, SettingsService, TitleService, MenuService } from "@delon/theme";
import { I18nService } from '../i18n/i18n.service';
import { ACLService } from "@delon/acl";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { ICONS } from "../../../style-icons";
import { ICONS_AUTO } from "../../../style-icons-auto";
import { Observable, zip, catchError, map } from "rxjs";
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Injectable()
export class StartupService {

  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18nService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    private httpClient: HttpClient,
    private router: Router
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS)
  }

  load(): Observable<void> {
    const defaultLang = this.i18n.defaultLang
    return zip(this.i18n.loadLangData(defaultLang), this.httpClient.get('assets/tmp/app-data.json')).pipe(
      catchError(res => {
        console.warn(`StartupService.load: Network request failed`, res);
        setTimeout(() => this.router.navigateByUrl(`/exception/500`))
        return [];
      }),
      map(([langData, appData]: [Record<string, string>, NzSafeAny]) => {
        this.i18n.use(defaultLang, langData);
        this.settingService.setApp(appData.app);
        this.settingService.setUser(appData.user);
        this.aclService.setFull(true);
        this.menuService.add(appData.menu);
        this.titleService.default = '';
        this.titleService.suffix = appData.app.name;
      })
    );
  }
}
