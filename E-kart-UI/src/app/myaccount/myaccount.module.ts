import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyaccountRoutingModule } from './myaccount-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { OrdersAndReturnsComponent } from './orders-and-returns/orders-and-returns.component';
import { CouponsComponent } from './coupons/coupons.component';
import { ProfileComponent } from './profile/profile.component';
import { SavedAddressesComponent } from './saved-addresses/saved-addresses.component';
import { MatStepperIntl } from '@angular/material';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AddNewAddressComponent } from './add-new-address/add-new-address.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [OverviewComponent, OrdersAndReturnsComponent, CouponsComponent, ProfileComponent, SavedAddressesComponent, OrderDetailsComponent, AddNewAddressComponent, SideNavComponent, EditProfileComponent],
  imports: [
    CommonModule,
    MyaccountRoutingModule,
    SharedModuleModule
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    }
  ],
  entryComponents:[OrderDetailsComponent,AddNewAddressComponent,EditProfileComponent],
})
export class MyaccountModule { }
