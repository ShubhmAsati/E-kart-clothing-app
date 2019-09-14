import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingKartRoutingModule } from './shopping-kart-routing.module';
import { KartComponent } from './kart/kart.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [KartComponent],
  imports: [
    CommonModule,
    ShoppingKartRoutingModule,
    SharedModuleModule
  ]
})
export class ShoppingKartModule { }
