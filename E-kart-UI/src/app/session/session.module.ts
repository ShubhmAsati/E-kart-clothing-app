import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { SessionRoutingModule } from './session-routing.module';

@NgModule({
  declarations: [LoginComponent,SignupComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    SessionRoutingModule
  ]
})
export class SessionModule { }
