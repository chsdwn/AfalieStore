import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductAdminService } from './../../../services/product-admin.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit {
  productForm: FormGroup;
  isCreating = false;
  createdVehicle: object;

  constructor(private productAdminService: ProductAdminService, private router: Router) { }

  ngOnInit() {
    this.productForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      value: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product = {
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        value: +this.productForm.value.value
      };
      
      this.isCreating = true;
      this.productAdminService.createProduct(product).subscribe(res => {
        this.createdVehicle = res;
        console.log(this.createdVehicle);
        this.isCreating = false;
        this.router.navigate(['list']);
      });
    }
  }

}
