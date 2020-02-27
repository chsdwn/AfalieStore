import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';

import { ProductForCreationAdmin } from './../models/ProductForCreationAdmin';
import { ProductForDetailedAdmin } from './../models/ProductForDetailedAdmin';
import { ProductForListAdmin } from './../models/ProductForListAdmin';
import { ProductForUpdateAdmin } from './../models/ProductForUpdateAdmin';

@Injectable({
  providedIn: 'root'
})
export class ProductAdminService {
  private url = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {
  }

  getProduct(id: number) {
    return this.http.get<ProductForDetailedAdmin>(`${this.url}/products/${id}`);
  }

  getProducts() {
    return this.http.get<ProductForListAdmin[]>(`${this.url}/products`);
  }

  createProduct(product: ProductForCreationAdmin) {
    return this.http.post(`${this.url}/products`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.url}/products/${id}`);
  }

  updateProduct(id: number, product: ProductForUpdateAdmin) {
    return this.http.put(`${this.url}/products/${id}`, product);
  }
}
