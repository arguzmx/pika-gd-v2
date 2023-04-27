import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { AlainThemeModule } from "@delon/theme";

import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
import { UiDinamicaModule } from '@pika-web/ui-dinamica';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule.forChild(),
    ...SHARED_ZORRO_MODULES
  ],
  declarations: [],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AlainThemeModule,
    UiDinamicaModule,
    ...SHARED_ZORRO_MODULES
  ]
})
export class SharedModule { }
