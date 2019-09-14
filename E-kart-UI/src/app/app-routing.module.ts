import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';

const routes: Routes = [

 
  
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
    ]
  },{
      path: 'products',
      component: AppLayoutComponent,
      children: [
        {
          path: '',
          loadChildren: './products/products.module#ProductsModule'
        },
      ]
    },
    {
      path: 'session',
      component: AppLayoutComponent,
      children: [
        {
          path: '',
          loadChildren: './session/session.module#SessionModule'
        },
      ]
    },
    {
      path: 'session',
      component: AppLayoutComponent,
      children: [
        {
          path: 'signup',
          loadChildren: './session/session.module#SessionModule'
        },
      ]
    },
    {
      path: 'dashboard',
      component: AppLayoutComponent,
      children: [
        {
          path: '',
          loadChildren: './dashboard/dashboard.module#DashboardModule'
        },
      ]
    },
    {
      path: 'cart',
      component: AppLayoutComponent,
      children: [
        {
          path: '',
          loadChildren: './shopping-kart/shopping-kart.module#ShoppingKartModule'
        },
      ]
    },
    {
      path: 'wishlist',
      component: AppLayoutComponent,
      children: [
        {
          path: '',
          loadChildren: './wishlist/wishlist.module#WishlistModule'
        },
      ]
    },
    {
      path: 'myaccount',
      component: AppLayoutComponent,
      children: [
        {
          path: '',
          loadChildren: './myaccount/myaccount.module#MyaccountModule'
        },
        {
          path: 'orders',
          loadChildren: './myaccount/myaccount.module#MyaccountModule'
        },
        {
          path: 'profile',
          loadChildren: './myaccount/myaccount.module#MyaccountModule'
        },
        {
          path: 'coupons',
          loadChildren: './myaccount/myaccount.module#MyaccountModule'
        },
        {
          path: 'address',
          loadChildren: './myaccount/myaccount.module#MyaccountModule'
        },
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: '',
          loadChildren: './admin/admin.module#AdminModule'
        },
        {
          path: 'addProducts',
          loadChildren: './admin/admin.module#AdminModule',
        },
        {
          path: 'updateProducts',
          loadChildren: './admin/admin.module#AdminModule',
        },
        {
          path: 'viewProducts',
          loadChildren: './admin/admin.module#AdminModule',
        }
      ]
    }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
