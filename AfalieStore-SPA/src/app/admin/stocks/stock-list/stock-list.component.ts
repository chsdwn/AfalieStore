import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { StockAdminService } from './../../../services/stock-admin.service';
import { ProductAdminService } from './../../../services/product-admin.service';

import { ProductForListAdmin } from './../../../models/ProductForListAdmin';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  products: ProductForListAdmin[] = [];
  selectedProductId: number;
  @Output() $selectedProductId = new EventEmitter<number>();

  constructor(
    private productAdminService: ProductAdminService,
    private stockAdminService: StockAdminService
  ) { }

  ngOnInit() {
    this.productAdminService.getProducts().subscribe(products => {
      for (let i = 0; i < products.length; i++) {
        this.products.push(products[i]);
      }
    });
  }

  onProductSelect(productId: number) {
    this.selectedProductId = productId;
    this.stockAdminService.productId = productId;
    this.stockAdminService.setProductIdChanged(true);
    this.$selectedProductId.next(this.selectedProductId);
  }

}
