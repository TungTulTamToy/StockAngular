import { Component, Input, OnDestroy } from '@angular/core';
import { DecimalPipe } from "@angular/common";

import { ICheckBoxFilter } from "app/entities/iFilter";
import { BaseStockGridComponent } from "app/components/stock-grid/base-stock-grid.component";
import { Subscription } from "rxjs/Subscription";
import { StockNotificationService } from "app/services/stock-notification/stock-notification.service";

@Component({
  selector: 'app-stock-grid',
  templateUrl: './stock-grid.component.html',
  styleUrls: ['./stock-grid.component.css']
})
export class StockGridComponent extends BaseStockGridComponent implements OnDestroy {
  subscription: Subscription;
  StockData: any;

  constructor(private decimalPipe: DecimalPipe, private stockNotificationService: StockNotificationService) {
    super(decimalPipe);
    this.subscription = this.stockNotificationService.GetObservable().subscribe(data => { this.StockData = data; });
  }

  isShow(filterName:string):boolean{
    return this.baseGetFilterValue(false,filterName,(f)=>(<ICheckBoxFilter>f).FilterVisible);
  }

  getYearsHeader(minYear:number, maxYear:number):Array<number>{
    return this.baseMakeYearRangeWithItems(minYear,maxYear,(y)=>y);
  }

  getItemsOfEachYear(inputItems:any, minYear:number, maxYear:number):Array<string>{
    return this.baseMakeYearRangeWithItems(minYear,maxYear,(y)=>this.baseGetNumberToDisplay(inputItems,'year',y,'value'));
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

  getDisplayNumberOfYear():number{
    return this.baseGetDisplayNumberOfYear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}