import { ProductForDetailedAdmin } from './../../../models/ProductForDetailedAdmin';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductAdminService } from './../../../services/product-admin.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit {
  productForm: FormGroup;
  id: number = null;
  isCreating = false;
  createdProduct: object;
  product: ProductForDetailedAdmin;

  constructor(
    private productAdminService: ProductAdminService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.id = +params.id;
        this.productAdminService.getProduct(this.id).subscribe(product => {
          this.product = product;
          this.initForm();
        });
      } else {
        this.initForm();
      }
    });
  }

  initForm() {
    if (this.product) {
      this.productForm = new FormGroup({
        name: new FormControl(this.product.name, Validators.required),
        description: new FormControl(this.product.description, Validators.required),
        value: new FormControl(this.product.value, Validators.required)
      });
    } else {
      this.productForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        value: new FormControl(null, Validators.required)
      });
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product = {
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        value: +this.productForm.value.value
      };

      this.isCreating = true;
      if (this.id === null) {
        this.productAdminService.createProduct(product).subscribe(res => {
          this.createdProduct = res;
          this.isCreating = false;
          this.router.navigate(['/admin/products/list']);
        });
      } else {
        this.productAdminService.updateProduct(this.id, product).subscribe(res => {
          this.createdProduct = res;
          this.isCreating = false;
          this.router.navigate(['/admin/products/list']);
        });
      }
    }
  }

}
