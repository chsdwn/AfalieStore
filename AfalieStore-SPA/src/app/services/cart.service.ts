import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: { stockId: number, qty: number }[] = [];

  addToCart(cartItem: { stockId: number, qty: number }) {
    this.getCart();

    const itemIndex = this.cartItems.findIndex(cI => cI.stockId === cartItem.stockId);
    if (itemIndex !== -1) {
      this.cartItems[itemIndex].qty += cartItem.qty;
    } else {
      this.cartItems.push(cartItem);
    }

    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getCart() {
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
