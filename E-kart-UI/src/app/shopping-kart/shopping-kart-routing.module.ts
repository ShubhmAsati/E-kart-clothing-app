import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KartComponent } from './kart/kart.component';

const routes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: KartComponent,
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingKartRoutingModule { }
