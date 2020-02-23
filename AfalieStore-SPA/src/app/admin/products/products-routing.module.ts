import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductNewComponent } from './product-new/product-new.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  {
    path: '', component: ProductsComponent,
    children: [
      { path: 'list', component: ProductListComponent },
      { path: 'new', component: ProductNewComponent },
      { path: ':id', component: ProductNewComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
