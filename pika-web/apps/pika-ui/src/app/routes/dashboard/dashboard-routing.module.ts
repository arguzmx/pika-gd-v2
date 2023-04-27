import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardV1Component } from './v1/v1.component';
import { EditorTabularComponent } from "@pika-web/ui-dinamica";
import { DatePickerComponent } from 'libs/ui-dinamica/src/lib/components/customDateComponents/date-picker/date-picker.component';

const routes: Routes = [
  { path: '', redirectTo: 'v1', pathMatch: 'full' },
  { path: 'v1', component: DashboardV1Component },
  { path: 'editorTabular', component: EditorTabularComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
