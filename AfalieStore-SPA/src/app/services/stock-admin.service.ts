import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment.prod';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockAdminService {
  private url = `${environment.apiUrl}/admin/stocks`;
  public productId: number;
  private $productIdChanged = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  setProductIdChanged(condition: boolean) {
    this.$productIdChanged.next(condition);
  }

  getProductIdChanged() {
    return this.$productIdChanged;
  }

  getStocks(productId: number) {
    return this.http.get(`${this.url}/${productId}`);
  }

  createStock(stock: {productId: number, description: string, qty: number}) {
    return this.http.post(`${this.url}`, stock);
  }

  updateStocks(stocks: {id: number, description: string, qty: number}[], productId: number) {
    return this.http.put(`${this.url}/${productId}`, stocks);
  }

  deleteStock(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
