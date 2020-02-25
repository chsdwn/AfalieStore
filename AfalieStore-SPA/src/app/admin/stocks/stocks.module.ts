import { StockEditComponent } from './stock-edit/stock-edit.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StocksComponent } from './stocks.component';
import { StockNewComponent } from './stock-new/stock-new.component';
import { StocksRoutingModule } from './stocks-routing.module';

@NgModule({
  declarations: [
    StocksComponent,
    StockEditComponent,
    StockListComponent,
    StockNewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    StocksRoutingModule
  ]
})
export class StocksModule {}
