import { Component, OnInit } from '@angular/core';
import { ProductAdminService } from './../../../services/product-admin.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  loading = false;
  products;

  constructor(private productAdminService: ProductAdminService) { }

  ngOnInit() {
    this.loading = true;
    this.productAdminService.getProducts().subscribe(res => {
      this.products = res;
      this.loading = false;
    });
  }

}
