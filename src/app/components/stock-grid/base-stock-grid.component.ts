import { Input } from '@angular/core';
import { DecimalPipe } from "@angular/common";

import { IFilter, ISelectValueFilter } from "app/entities/iFilter";

export class BaseStockGridComponent {
  @Input() Filters: IFilter[];

  constructor(private baseDecimalPipe: DecimalPipe) { }

  baseFindItem<TObject>(items:TObject[],callback:(item:TObject)=>boolean):TObject{
    let result:TObject = null;
    if(items!=null)
    {
      result = items.find(x=>callback(x));
    }
    return result;
  }

  baseGetFilterValue<TResult>(defaultValue:TResult,filterName:string,callback:(filter:IFilter)=>TResult):TResult{
    let value:TResult = defaultValue;
    let filter:IFilter = this.baseFindItem(this.Filters,f=>f.FilterName==filterName);
    if(filter!=null)
    {
      value = callback(filter);
    }
    return value;
  }

  baseGetNumber<TKey,TInput>(inputItems:TInput[], keyName:string, keyValue:TKey, retrievedKeyName:string):number{
    let item = this.baseFindItem(inputItems,i=>i[keyName]==keyValue);
    let result:number = null;
    if(item!=null && item[retrievedKeyName]!=null){
      try{
        result = item[retrievedKeyName];
      }catch(error){
        console.log(error);
      }
    }
    return result;
  }

  baseGetNumberToDisplay<TKey,TInput>(inputItems:TInput[], keyName:string, keyValue:TKey, retrievedKeyName:string, defaultValue:string = 'N/A', format:string = '1.2-2', infinityDisplayValue:string = 'INF'):string{
    let item = this.baseGetNumber(inputItems,keyName,keyValue,retrievedKeyName);
    let result:string = defaultValue;
    if(item!=null){
      try{
        if(item!=Infinity){
          result = this.baseDecimalPipe.transform(item, format);
        }else{
          result = infinityDisplayValue;
        }
      }catch(error){
        console.log(error);
      }
    }
    return result;
  }
  
  baseGetDisplayNumberOfYear():number{
    return this.baseGetFilterValue(3,'Number of year',(f)=>(<ISelectValueFilter>f).SelectedValue);
  }

  baseMakeYearRangeWithItems<TResult>(minYear:number,maxYear:number,callback:(currentYear:number)=>TResult):Array<TResult>{
    let items = new Array<TResult>();
    let currentYear:number = maxYear;
    let numberOfYear:number = this.baseGetDisplayNumberOfYear();
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