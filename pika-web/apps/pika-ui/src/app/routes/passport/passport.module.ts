import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassportRoutingModule } from './passport-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../shared/shared.module';

const COMPONENTS = [LoginComponent]

@NgModule({
  imports: [SharedModule, PassportRoutingModule],
  declarations: [...COMPONENTS]
})
export class PassportModule { }
