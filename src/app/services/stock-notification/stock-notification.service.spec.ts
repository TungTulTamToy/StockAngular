/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StockNotificationService } from './stock-notification.service';

describe('StockNotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockNotificationService]
    });
  });

  it('should ...', inject([StockNotificationService], (service: StockNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
