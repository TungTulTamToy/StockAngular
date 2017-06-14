import {Pipe, PipeTransform} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Pipe({
  name: 'safeNumber'
})
export class SafeNumberPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {
  }

  transform(value: any,args?: any): any {
    return (value != null) && (!isNaN(parseFloat(value)) && isFinite(value)) ? this.decimalPipe.transform(value, args) : "-";
  }
}