import { Component, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'clear-storage',
  template: `
  <i nz-icon nzType="tool"></i>
  {{ 'menu.clear.local.storage' | i18n }}
`,
  host: {
    '[class.flex-1]': 'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderClearStorageComponent {

  constructor(private modalSrv: NzModalService, private messageSrv: NzMessageService) { }

  @HostListener('click')
  _click(): void {
    this.modalSrv.confirm({
      nzTitle: 'Estas seguro de limpiar el almacenamiento local?',
      nzOnOk: () => {
        localStorage.clear();
        this.messageSrv.success('Limpieza completada!')
      }
    })
  }

}
