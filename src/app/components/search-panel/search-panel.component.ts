import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IFilter } from "app/entities/iFilter";
import { CheckBoxFilter, SelectValueFilter } from "app/entities/filter";
import { StockService } from "app/services/stock-service/stock.service";
import { Subscription } from "rxjs/Subscription";
import { StockNotificationService } from "app/services/stock-notification/stock-notification.service";

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css']
})
export class SearchPanelComponent implements OnInit {
  @Input() Filters: IFilter[];
  
  private groups:string[];
  private selectedGroup:string="All";
  private numberOfFilterColumns:number = 4;  
  private stockData: any;  

  constructor(private stockService: StockService, private stockNotificationService: StockNotificationService) { }

  async ngOnInit(): Promise<void> {
    let groupsTask = this.stockService.GetGroups();
    let stocksByGroupTask = this.stockService.GetStocksByGroup(this.selectedGroup);

    this.groups = await groupsTask;
    this.stockData = await stocksByGroupTask;
    this.stockNotificationService.Notify(this.stockData);
  }

  async updateStockByGroup():Promise<void> {
    this.stockData = await this.stockService.GetStocksByGroup(this.selectedGroup);
    this.stockNotificationService.Notify(this.stockData);
  }

  isCheckBoxFilter(val) { return val instanceof CheckBoxFilter; }
  isSelectValueFilter(val) { return val instanceof SelectValueFilter; }
}