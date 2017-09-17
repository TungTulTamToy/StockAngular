import { DecimalPipe } from "@angular/common";

import { TryCatchDecorator } from "app/decorator/try-catch.decorator";

export class BaseStockGridComponent {

  constructor(private baseDecimalPipe: DecimalPipe) { }

  baseFindItem<TObject>(items:TObject[],callback:(item:TObject)=>boolean):TObject{
    let result:TObject = null;
    if(items!=null)
    {
      result = items.find(x=>callback(x));
    }
    return result;
  }

  @TryCatchDecorator
  baseGetNumber<TKey,TInput>(inputItems:TInput[], keyName:string, keyValue:TKey, retrievedKeyName:string):number{
    let item = this.baseFindItem(inputItems,i=>i[keyName]==keyValue);
    let result:number = null;
    if(item!=null && item[retrievedKeyName]!=null){
      result = item[retrievedKeyName];
    }
    return result;
  }

  @TryCatchDecorator
  baseGetNumberToDisplay<TKey,TInput>(inputItems:TInput[], keyName:string, keyValue:TKey, retrievedKeyName:string, defaultValue:string = 'N/A', format:string = '1.2-2', infinityDisplayValue:string = 'INF'):string{
    let item = this.baseGetNumber(inputItems,keyName,keyValue,retrievedKeyName);
    let result:string = defaultValue;
    if(item!=null){
      if(item!=Infinity){
        result = this.baseDecimalPipe.transform(item, format);
      }else{
        result = infinityDisplayValue;
      }
    }
    return result;
  }
  
}