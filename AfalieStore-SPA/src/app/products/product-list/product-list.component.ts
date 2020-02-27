import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

import { ProductService } from '../../services/product.service';

import { ProductForList } from './../../models/ProductForList';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: ProductForList[];

  constructor(
    private productService: ProductService,
    private title: Title,
    private meta: Meta,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.title.setTitle('Product List | Afalie Store');

    this.meta.addTags([
      { name: 'description', content: 'Afalie store products page.' },
      { name: 'keywords', content: 'afalie store, products'}
    ]);

    this.products = [];
    this.productService.getProducts().subscribe(products => {
      for (let i = 0; i < products.length; i++) {
        this.products.push(products[i]);
      }
    });
  }

  onProductClick(id: number) {
    const product = this.products.find(p => p.id == id);
    const url = product.name.split(' ').join('-') + '-' + id;

    this.router.navigate([url], { relativeTo: this.route });
  }

}
