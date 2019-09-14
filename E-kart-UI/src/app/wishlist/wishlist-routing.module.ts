import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: WishlistComponent,
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WishlistRoutingModule { }
