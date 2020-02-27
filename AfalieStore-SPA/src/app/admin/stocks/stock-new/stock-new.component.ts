import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { StockAdminService } from './../../../services/stock-admin.service';

import { StockForCreationAdmin } from './../../../models/StockForCreationAdmin';

@Component({
  selector: 'app-stock-new',
  templateUrl: './stock-new.component.html',
  styleUrls: ['./stock-new.component.scss']
})
export class StockNewComponent implements OnInit {
  stockForm: FormGroup;
  createdStock: object;
  productId: number;

  constructor(private stockAdminService: StockAdminService) { }

  ngOnInit() {
    this.productId = this.stockAdminService.productId;
    console.log('new', this.productId);

    this.stockAdminService.getProductIdChanged().subscribe(isChanged => {
      if (isChanged) {
        this.productId = this.stockAdminService.productId;
        console.log('new-changed', this.productId);
      }
    });

    this.stockForm = new FormGroup({
      description: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.stockForm.valid && this.productId) {
      const stock: StockForCreationAdmin = {
        productId: this.productId,
        description: this.stockForm.value.description,
        qty: +this.stockForm.value.quantity
      };

      this.stockAdminService.createStock(stock).subscribe(res => {
        this.createdStock = res;
        this.stockForm.reset();
      });
    }
  }
}
