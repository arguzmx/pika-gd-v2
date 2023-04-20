import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { AlainConfig, ALAIN_CONFIG } from "@delon/util";
import { AlainThemeModule } from "@delon/theme";
import { DelonACLModule } from '@delon/acl';
import { throwIfAlreadyLoaded } from './core/moudle-import-guard';

const alainConfig: AlainConfig = {
  auth: { login_url: '/passport/login' }
};
const alainModules: any[] = [AlainThemeModule.forRoot(), DelonACLModule.forRoot()];
const alainProvides = [{ provide: ALAIN_CONFIG, useValue: alainConfig }]

import { NzConfig, NZ_CONFIG } from "ng-zorro-antd/core/config";

const ngZorroConfig: NzConfig = {}

const zorroPrviders = [{ provide: NZ_CONFIG, useValue: ngZorroConfig }]



@NgModule({
  declarations: [],
  imports: [
    ...alainModules, []
  ]
})
export class GlobalConfigModule {
  constructor(@Optional() @SkipSelf() parentModule: GlobalConfigModule) {
    throwIfAlreadyLoaded(parentModule, 'GlobalConfigModule');
  }

  static forRoot(): ModuleWithProviders<GlobalConfigModule> {
    return {
      ngModule: GlobalConfigModule,
      providers: [...alainProvides, ...zorroPrviders]
    }
  }
}
