import { ChangeDetectionStrategy, Component, OnChanges, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'pika-web-panel-wrapper',
  templateUrl: './panel-wrapper.component.html',
  styleUrls: ['./panel-wrapper.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelWrapperComponent extends FieldWrapper implements OnInit, OnDestroy {

  @ViewChild('fieldComponent', { read: ViewContainerRef }) override fieldComponent: ViewContainerRef;

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.form.reset()
    this.fieldComponent
  }

  required() {
    if (this.to.required) {
      return 'required'
    }
    return ''
  }
}
