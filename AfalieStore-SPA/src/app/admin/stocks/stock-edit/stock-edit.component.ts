import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { StockAdminService } from './../../../services/stock-admin.service';

import { StockForDetailedAdmin } from './../../../models/StockForDetailedAdmin';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.scss']
})
export class StockEditComponent implements OnInit {
  stocksForm: FormGroup;
  productId: number;
  stocks: StockForDetailedAdmin[];
  isUpdating = false;

  constructor(private stockAdminService: StockAdminService) { }

  ngOnInit() {
    this.productId = this.stockAdminService.productId;
    if (this.productId) {
      this.initStocks();
    }

    this.stockAdminService.getProductIdChanged().subscribe(isChanged => {
      if (isChanged) {
        this.productId = this.stockAdminService.productId;
        this.initStocks();
      }
    });
  }

  initForm() {
    this.stocksForm = new FormGroup({});
    for (let i = 0; i < this.stocks.length; i++) {
      this.stocksForm.addControl(i + 'description', new FormControl(this.stocks[i].description, Validators.required));
      this.stocksForm.addControl(i + 'quantity', new FormControl(this.stocks[i].qty, Validators.required));
    }
  }

  initStocks() {
    this.stockAdminService.getStocks(this.productId).subscribe(stocks => {
      this.stocks = [];

      for (let i = 0; i < stocks.length; i++) {
        this.stocks.push({
          id: stocks[i].id,
          description: stocks[i].description,
          qty: stocks[i].qty
        });
      }
      this.initForm();
    });
  }

  onSubmit() {
    if (this.stocksForm.valid && this.stocksForm.touched) {
      this.isUpdating = true;
      const formValue = this.stocksForm.value;
      for (let i = 0; i < this.stocks.length; i++) {
        this.stocks[i].description = formValue[i + 'description'];
        this.stocks[i].qty = formValue[i + 'quantity'];
      }

      this.stockAdminService.updateStocks(this.stocks, this.productId).subscribe(res => {
        const response = res;
        this.isUpdating = false;
      });
    }
  }

  onStockDelete(id: number, index: number) {
    this.stockAdminService.deleteStock(id).subscribe(() => this.stocks.splice(index, 1));
  }
}
