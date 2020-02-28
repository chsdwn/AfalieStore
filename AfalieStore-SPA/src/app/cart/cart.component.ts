import { Component, OnInit } from '@angular/core';

import { CartService } from './../services/cart.service';

import { CartProduct } from './../models/CartProduct';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartProducts: CartProduct[];
  isLoading = false;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    if (this.cartService.getCartProducts() !== null) {
      this.isLoading = true;
      this.cartService.getCartProducts().subscribe(cartProducts => {
        this.cartProducts = cartProducts;
        this.isLoading = false;
      });
    }
  }

}
