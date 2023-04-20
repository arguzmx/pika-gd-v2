import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlainThemeModule } from '@delon/theme';
import { LayoutDefaultModule } from '@delon/theme/layout-default';
import { SettingDrawerModule } from '@delon/theme/setting-drawer';
import { ThemeBtnModule } from '@delon/theme/theme-btn';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NoticeIconModule } from '@delon/abc/notice-icon';
import { GlobalFooterModule } from '@delon/abc/global-footer';


const COMPONENTS = [LayoutBasicComponent];
const HEADERCOMPONENTS = [
  HeaderClearStorageComponent,
  HeaderFullScreenComponent,
  HeaderI18nComponent,
  HeaderIconComponent,
  HeaderNotifyComponent,
  HeaderRTLComponent,
  HeaderSearchComponent,
  HeaderTaskComponent,
  HeaderUserComponent
];

import { LayoutPassportComponent } from './passport/passport.component';
import { LayoutBasicComponent } from './basic/basic.component';
import { HeaderClearStorageComponent } from './basic/widgets/clear-storage.component';
import { HeaderFullScreenComponent } from './basic/widgets/fullscreen.component';
import { HeaderI18nComponent } from './basic/widgets/i18n.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAutocompleteModule } from "ng-zorro-antd/auto-complete";
import { HeaderIconComponent } from './basic/widgets/icon.component';
import { HeaderNotifyComponent } from './basic/widgets/notify.component';
import { HeaderRTLComponent } from './basic/widgets/rtl.component';
import { HeaderSearchComponent } from './basic/widgets/search.component';
import { HeaderTaskComponent } from './basic/widgets/task.component';
import { HeaderUserComponent } from './basic/widgets/user.component';


const PASSPORT = [LayoutPassportComponent];

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
    GlobalFooterModule,
    NzDropDownModule,
    NzInputModule,
    NzAutocompleteModule,
    NzGridModule,
    NzFormModule,
    NzSpinModule,
    NzBadgeModule,
    NzAvatarModule,
    NzCardModule
  ],
  declarations: [...COMPONENTS, ...PASSPORT, ...HEADERCOMPONENTS],
  exports: [...PASSPORT],
})
export class LayoutModule { }
