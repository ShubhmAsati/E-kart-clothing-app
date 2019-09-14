import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { OrdersAndReturnsComponent } from './orders-and-returns/orders-and-returns.component';
import { ProfileComponent } from './profile/profile.component';
import { CouponsComponent } from './coupons/coupons.component';
import { SavedAddressesComponent } from './saved-addresses/saved-addresses.component';

const routes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: OverviewComponent,
      },
      {
        path: 'orders',
        component: OrdersAndReturnsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'coupons',
        component: CouponsComponent,
      },
      {
        path: 'address',
        component: SavedAddressesComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyaccountRoutingModule { }
