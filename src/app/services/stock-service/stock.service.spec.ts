/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StockService } from './stock.service';

describe('stockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockService]
    });
  });

  it('should ...', inject([StockService], (service: StockService) => {
    expect(service).toBeTruthy();
  }));
});
