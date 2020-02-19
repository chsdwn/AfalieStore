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

  getProducts() {
    return this.http.get(`${this.url}/products`);
  }
}
