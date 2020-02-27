import { Component, OnInit } from '@angular/core';

import { ProductAdminService } from './../../../services/product-admin.service';

import { ProductForListAdmin } from './../../../models/ProductForListAdmin';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: ProductForListAdmin[];
  loading = false;
  deleting = false;

  constructor(private productAdminService: ProductAdminService) { }

  ngOnInit() {
    this.loading = true;
    this.productAdminService.getProducts().subscribe(products => {
      this.products = products;
      this.loading = false;
    });
  }

  onDelete(id: number, index: number) {
    if (id) {
      this.deleting = true;
      this.productAdminService.deleteProduct(id).subscribe(() => {
        this.products.splice(index, 1);
        this.deleting = false;
      });
    }
  }

}
