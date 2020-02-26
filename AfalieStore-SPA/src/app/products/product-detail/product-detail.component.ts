import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  id: number;
  product: {
    name: string,
    description: string,
    value: number,
    stock: {
      id: number,
      description: string,
      inStock: boolean
    }[]
  };

  constructor(
    private productService: ProductService,
    private title: Title,
    private meta: Meta,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const params = this.route.snapshot.paramMap.get('name-id').split('-');

    this.id = +params[params.length - 1];

    this.productService.getProduct(this.id).subscribe(res => {
      const stock = [];

      for (let i = 0; i < res.stock.length; i++) {
        stock.push(res.stock[i]);
      }

      this.product = {
        name: res.name,
        description: res.description,
        value: res.value,
        stock
      };
    });
  }

}
