import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProduct(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

  getProducts() {
    return this.http.get(`${this.url}`);
  }
}
