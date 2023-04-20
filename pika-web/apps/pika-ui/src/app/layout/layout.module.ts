import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { AlainThemeModule } from "@delon/theme";
import { LayoutDefaultModule } from "@delon/theme/layout-default";
import { SettingDrawerModule } from "@delon/theme/setting-drawer";
import { ThemeBtnModule } from "@delon/theme/theme-btn";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NoticeIconModule } from "@delon/abc/notice-icon";
import { GlobalFooterModule } from "@delon/abc/global-footer";

const COMPONENTS = []
const HEADERCOMPONENTS = []

import { LayoutPassportComponent } from "./passport/passport.component";

const PASSPORT = [LayoutPassportComponent]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AlainThemeModule.forChild(),
    ThemeBtnModule,
    LayoutDefaultModule,
    SettingDrawerModule,
    NzIconModule,
    NoticeIconModule,
    GlobalFooterModule
  ],
  declarations: [...PASSPORT],
  exports: [...PASSPORT]
})
export class LayoutModule { }
