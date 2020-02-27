import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

import { ProductService } from '../../services/product.service';

import { ProductForDetailed } from './../../models/ProductForDetailed';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  id: number;
  product: ProductForDetailed;

  constructor(
    private productService: ProductService,
    private title: Title,
    private meta: Meta,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const params = this.route.snapshot.paramMap.get('name-id').split('-');

    this.id = +params[params.length - 1];

    this.productService.getProduct(this.id).subscribe(product => {
      this.product = {
        name: product.name,
        description: product.description,
        value: product.value,
        stock: product.stock
      };
    });
  }

}
