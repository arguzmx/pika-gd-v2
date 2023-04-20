import { Component } from '@angular/core';
import { LayoutDefaultOptions } from "@delon/theme/layout-default";
import { SettingsService, User } from "@delon/theme";

@Component({
  selector: 'pika-web-layout-basic',
  templateUrl: './basic.component.html'
})
export class LayoutBasicComponent {
  options: LayoutDefaultOptions = {
    logoExpanded: `./assets/logo-full.svg`,
    logoCollapsed: `./assets/logo.svg`
  };

  searchToggleStatus = false;
  showSettingDrawer = false;

  get user(): User {
    return this.settings.user;
  }

  constructor(private settings: SettingsService) { }
}
