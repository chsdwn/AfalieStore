import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductAdminService {
  private url = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {
  }

  getProduct(id: number) {
    return this.http.get<{id: number, name: string, description: string, value: number}>(`${this.url}/products/${id}`);
  }

  getProducts() {
    return this.http.get(`${this.url}/products`);
  }

  createProduct(product: {name: string, description: string, value: number}) {
    return this.http.post(`${this.url}/products`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.url}/products/${id}`);
  }

  updateProduct(id: number, product: {name: string, description: string, value: number}) {
    return this.http.put(`${this.url}/products/${id}`, product);
  }
}
