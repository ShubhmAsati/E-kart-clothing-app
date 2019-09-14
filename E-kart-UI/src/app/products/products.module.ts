import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { StarRatingModule } from 'angular-star-rating';
import { ProductDetailsComponent } from './product-details/product-details.component';
import 'hammerjs';

@NgModule({
  declarations: [ProductComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ScrollingModule,
    SharedModuleModule,
    StarRatingModule.forRoot()
  ]
})
export class ProductsModule { }
