import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


const routes: Routes = [
    {

        path: '',
        children: [
          {
            path: '',
            component: ProductComponent,
          },
          {
            path: 'product_by_category/:prod',
            component: ProductComponent,
          },
          {
            path: 'productDetails/:prod_id',
            component: ProductDetailsComponent,
          }
        ]
      }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }