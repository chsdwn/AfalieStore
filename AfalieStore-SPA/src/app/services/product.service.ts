import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';

import { ProductForDetailed } from './../models/ProductForDetailed';
import { ProductForList } from './../models/ProductForList';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProduct(id: number) {
    return this.http.get<ProductForDetailed>(`${this.url}/${id}`);
  }

  getProducts() {
    return this.http.get<ProductForList[]>(`${this.url}`);
  }
}
