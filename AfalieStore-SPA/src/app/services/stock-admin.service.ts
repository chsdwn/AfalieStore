import { StockForUpdateAdmin } from './../models/StockForUpdateAdmin';
import { StockForCreationAdmin } from './../models/StockForCreationAdmin';
import { StockForDetailedAdmin } from './../models/StockForDetailedAdmin';
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
    return this.http.get<StockForDetailedAdmin[]>(`${this.url}/${productId}`);
  }

  createStock(stock: StockForCreationAdmin) {
    return this.http.post(`${this.url}`, stock);
  }

  updateStocks(stocks: StockForUpdateAdmin[], productId: number) {
    return this.http.put(`${this.url}/${productId}`, stocks);
  }

  deleteStock(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
