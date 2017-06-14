import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StockService {
  private baseUrl: string = 'http://localhost:5200/api/Group';

  constructor(private http : Http) { }

  async GetGroups(): Promise<string[]> {
    try{
      const url = `${this.baseUrl}`;
      const response = await this.http.get(url).toPromise();
      return response.json().content.name;
    } catch(error){
      await this.handleError(error);
    }
  }

  async GetStocksByGroup(groupName:string): Promise<any> {
    try{
      const url = `${this.baseUrl}/${groupName}`;
      const response = await this.http.get(url).toPromise();
      //console.log(response.json());
      return response.json().content;
    } catch(error){
      await this.handleError(error);
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}