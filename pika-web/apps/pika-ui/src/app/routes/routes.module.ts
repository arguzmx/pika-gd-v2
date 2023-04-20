import { NgModule, Type } from '@angular/core';

import { RoutesRoutingModule } from './routes-routing.module';
import { SharedModule } from '../shared/shared.module';

const COMPONENTS: Array<Type<null>> = []

@NgModule({
  imports: [
    SharedModule,
    RoutesRoutingModule
  ],
  declarations: [...COMPONENTS]
})
export class RoutesModule { }
