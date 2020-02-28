import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';

import { ProductAdminService } from './product-admin.service';

import { CartItem } from './../models/CartItem';
import { CartProduct } from './../models/CartProduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private url = `${environment.apiUrl}/cart`;
  private cartItems: CartItem[] = [];

  constructor(
    private productAdminService: ProductAdminService,
    private http: HttpClient
  ) {}

  addToCart(cartItem: CartItem) {
    this.getCartFromStorage();

    const itemIndex = this.cartItems.findIndex(cI => cI.stockId === cartItem.stockId);
    if (itemIndex !== -1) {
      this.cartItems[itemIndex].qty += cartItem.qty;
    } else {
      this.cartItems.push(cartItem);
    }

    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getCartProducts() {
    this.getCartFromStorage();

    if (this.cartItems.length > 0) {
      return this.http.post<CartProduct[]>(`${this.url}`, this.cartItems);
    }

    return null;
  }

  private getCartFromStorage() {
    const data = sessionStorage.getItem('cart');
    this.cartItems = [];

    if (data) {
      const items = JSON.parse(data);
      for (let i = 0; i < items.length; i++) {
        this.cartItems.push(items[i]);
      }
    }
  }

}
