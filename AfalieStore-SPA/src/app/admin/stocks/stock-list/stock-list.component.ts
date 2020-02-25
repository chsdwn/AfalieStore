import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { StockAdminService } from './../../../services/stock-admin.service';
import { ProductAdminService } from './../../../services/product-admin.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  products: {id: number, name: string}[] = [];
  selectedProductId: number;
  @Output() $selectedProductId = new EventEmitter<number>();

  constructor(
    private productAdminService: ProductAdminService,
    private stockAdminService: StockAdminService
  ) { }

  ngOnInit() {
    this.productAdminService.getProducts().subscribe(products => {
      for (let i = 0; i < products.length; i++) {
        this.products.push({id: products[i].id, name: products[i].name});
      }
    });
  }

  onProductSelect(productId: number) {
    this.selectedProductId = productId;
    this.stockAdminService.productId = productId;
    this.stockAdminService.setProductIdChanged(true);
    console.log('list', this.stockAdminService.productId);
    this.$selectedProductId.next(this.selectedProductId);
  }

}
