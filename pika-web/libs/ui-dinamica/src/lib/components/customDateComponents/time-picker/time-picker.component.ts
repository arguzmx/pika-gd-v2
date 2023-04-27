import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'pika-web-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.less'],
})
export class TimePickerComponent extends FieldType<FieldTypeConfig> {
  time: Date | null = null;
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);
}
