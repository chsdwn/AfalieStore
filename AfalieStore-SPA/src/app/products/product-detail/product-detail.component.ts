import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

import { CartService } from './../../services/cart.service';
import { ProductService } from '../../services/product.service';

import { CartItem } from './../../models/CartItem';
import { ProductForDetailed } from './../../models/ProductForDetailed';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  id: number;
  product: ProductForDetailed;
  cartItem: CartItem;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private title: Title,
    private meta: Meta,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const params = this.route.snapshot.paramMap.get('name-id').split('-');

    this.id = +params[params.length - 1];

    this.productService.getProduct(this.id).subscribe(product => {
      this.product = product;
      if (this.product.stock.length > 0) {
        this.cartItem = { stockId: this.product.stock[0].id, qty: 0 };
      }
    });
  }

  onAddToCart() {
    this.cartService.addToCart(this.cartItem);
  }

  onStockChange(stockId: number) {
    this.cartItem.stockId = stockId;
  }

}
