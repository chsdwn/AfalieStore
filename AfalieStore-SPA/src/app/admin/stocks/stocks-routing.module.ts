import { StockEditComponent } from './stock-edit/stock-edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StocksComponent } from './stocks.component';
import { StockNewComponent } from './stock-new/stock-new.component';

const routes: Routes = [
  { path: '', redirectTo: 'new', pathMatch: 'full' },
  { 
    path: '', component: StocksComponent,
    children: [
      { path: 'new', component: StockNewComponent },
      { path: 'edit', component: StockEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule {}
