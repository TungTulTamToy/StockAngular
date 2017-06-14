import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class StockNotificationService {
  private subject = new Subject<any>();
 
  Notify(data: any) {
      this.subject.next(data);
  }

  GetObservable(): Observable<any> {
      return this.subject.asObservable();
  }
}
