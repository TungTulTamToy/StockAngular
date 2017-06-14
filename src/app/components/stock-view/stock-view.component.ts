import { Component, OnInit } from '@angular/core';
import { IFilter } from "app/entities/iFilter";
import { CheckBoxFilter, SelectValueFilter } from "app/entities/filter";

const FILTERS: IFilter[] = [
  new CheckBoxFilter('PE', true),
  new CheckBoxFilter('NetProfit',true),
  new CheckBoxFilter('Growth', false),
  new CheckBoxFilter('PEG', false),
  new CheckBoxFilter('PE Diff Percentage', false),  
  new CheckBoxFilter('Last Price', true),
  new CheckBoxFilter('3M Price Calculation', false),
  new CheckBoxFilter('6M Price Calculation', true),
  new CheckBoxFilter('1Y Price Calculation', false),
  new CheckBoxFilter('MACD', true),
  new CheckBoxFilter('Port Cal', true),
  new SelectValueFilter('Number of year', [8,7,6,5,4,3,2,1],3)
];

@Component({
  selector: 'app-stock-view',
  templateUrl: './stock-view.component.html',
  styleUrls: ['./stock-view.component.css']
})
export class StockViewComponent implements OnInit {
  title = 'Stock Web Viewer';
  filters: IFilter[] = FILTERS;
  stockData: any;

  constructor() { }

  ngOnInit() {
  }

  onChangeGroup(stockData:any){
    this.stockData = stockData;
  }

}
