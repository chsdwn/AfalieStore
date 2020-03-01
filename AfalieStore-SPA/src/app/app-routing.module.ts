import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { CustomerInformationComponent } from './customer-information/customer-information.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full'},
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  { 
    path: 'products', component: ProductsComponent,
    children: [
      { path: '', component: ProductListComponent },
      { path: ':name-id', component: ProductDetailComponent }
    ]
  },
  { path: 'cart', component: CartComponent },
  { path: 'customer-information', component: CustomerInformationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
