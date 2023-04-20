import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DashboardV1Component } from './v1/v1.component';

const COMPONENTS = [DashboardV1Component]

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [...COMPONENTS]
})
export class DashboardModule { }
