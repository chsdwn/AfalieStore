import { StockAdminService } from './../../services/stock-admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  selectedProductId: number;

  constructor(private stockAdminService: StockAdminService) { }

  ngOnInit() {
  }

  onProductSelect(selectedProductId: number) {
    this.selectedProductId = selectedProductId;
  }

}
