import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { UpdateProductsComponent } from './update-products/update-products.component';
import { ViewProductsComponent } from './view-products/view-products.component';

const routes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: AdminLoginComponent,
      },
      {
        path: 'addProducts',
        component: AddProductsComponent,
      },
      {
        path: 'updateProducts/:prod_id',
        component: UpdateProductsComponent,
      },
      {
        path: 'viewProducts',
        component: ViewProductsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
