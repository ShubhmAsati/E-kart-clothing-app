import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [WishlistComponent],
  imports: [
    CommonModule,
    WishlistRoutingModule,
    SharedModuleModule
  ]
})
export class WishlistModule { }
