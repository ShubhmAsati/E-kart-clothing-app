import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { UpdateProductsComponent } from './update-products/update-products.component';
import { ViewProductsComponent } from './view-products/view-products.component';

@NgModule({
  declarations: [AdminLoginComponent, AddProductsComponent, UpdateProductsComponent, ViewProductsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModuleModule,
    ColorPickerModule
  ]
})
export class AdminModule { }
