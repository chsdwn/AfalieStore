import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule {}
