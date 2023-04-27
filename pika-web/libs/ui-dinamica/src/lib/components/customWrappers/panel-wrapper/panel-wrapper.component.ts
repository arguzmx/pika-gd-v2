import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'pika-web-panel-wrapper',
  templateUrl: './panel-wrapper.component.html',
  styleUrls: ['./panel-wrapper.component.less'],
})
export class PanelWrapperComponent extends FieldWrapper implements OnInit {

  @ViewChild('fieldComponent', { read: ViewContainerRef }) override fieldComponent: ViewContainerRef;

  count = 4;
  array = new Array(this.count);

  ngOnInit(): void {
  }

  required() {
    if (this.to.required) {
      return 'required'
    }
    return ''
  }
}
