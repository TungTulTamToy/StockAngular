import { Component, OnDestroy, Input } from '@angular/core';
import { DecimalPipe } from "@angular/common";

import { ICheckBoxFilter, IFilter, ISelectValueFilter } from "app/entities/iFilter";
import { BaseStockGridComponent } from "app/components/stock-grid/base-stock-grid.component";
import { Subscription } from "rxjs/Subscription";
import { StockNotificationService } from "app/services/stock-notification/stock-notification.service";

@Component({
  selector: 'app-stock-grid',
  templateUrl: './stock-grid.component.html',
  styleUrls: ['./stock-grid.component.css']
})
export class StockGridComponent extends BaseStockGridComponent implements OnDestroy {
  @Input() Filters: IFilter[];
  
  subscription: Subscription;
  StockData: any;

  constructor(private decimalPipe: DecimalPipe, private stockNotificationService: StockNotificationService) {
    super(decimalPipe);
    this.subscription = this.stockNotificationService.GetObservable().subscribe(data => { this.StockData = data; });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isShow(filterName:string):boolean{
    return this.getFilterValue(false,filterName,(f)=>(<ICheckBoxFilter>f).FilterVisible);
  }

  getYearsHeader(minYear:number, maxYear:number):Array<number>{
    return this.makeYearRangeWithItems(minYear,maxYear,(y)=>y);
  }

  getItemsOfEachYear(inputItems:any, minYear:number, maxYear:number):Array<string>{
    return this.makeYearRangeWithItems(minYear,maxYear,(y)=>this.baseGetNumberToDisplay(inputItems,'year',y,'value'));
  }

  getPriceCal(data:any, keyValue:string, propertyName:string):string{
    return this.baseGetNumberToDisplay(data.priceCal,'name',keyValue,propertyName);
  }

  determineColor(data:any, keyValue:string, propertyName:string, levels:Array<number>,colors:Array<string>):string{
    let value = this.baseGetNumber(data.priceCal,'name',keyValue,propertyName);
    let color = colors[colors.length - 1];
    for (let i = 0; i < levels.length; i++) {
        if (value < levels[i]) {
            color = colors[i];
            break;
        }
    }
    return color;
  }

  getFilterValue<TResult>(defaultValue:TResult,filterName:string,callback:(filter:IFilter)=>TResult):TResult{
    let value:TResult = defaultValue;
    let filter:IFilter = this.baseFindItem(this.Filters,f=>f.FilterName==filterName);
    if(filter!=null)
    {
      value = callback(filter);
    }
    return value;
  }

  getDisplayNumberOfYear():number{
    return this.getFilterValue(3,'Number of year',(f)=>(<ISelectValueFilter>f).SelectedValue);
  }

  makeYearRangeWithItems<TResult>(minYear:number,maxYear:number,callback:(currentYear:number)=>TResult):Array<TResult>{
    let items = new Array<TResult>();
    let currentYear:number = maxYear;
    let numberOfYear:number = this.getDisplayNumberOfYear();
    while (currentYear >= minYear) {
        items.push(callback(currentYear));
        if (items.length >= numberOfYear){
            break;
        }
        currentYear--;
    }
    return items;
  }

}