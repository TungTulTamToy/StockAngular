import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IFilter } from "app/entities/iFilter";
import { CheckBoxFilter, SelectValueFilter } from "app/entities/filter";
import { GroupService } from "app/services/group-service/group.service";

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css']
})
export class SearchPanelComponent implements OnInit {
  @Input() Filters: IFilter[];
  @Output() OnChangeGroup: EventEmitter<any> = new EventEmitter();
  
  private groups:string[];
  private selectedGroup:string="All";
  private numberOfFilterColumns:number = 4;  
  private stockData: any;  

  constructor(private GroupService: GroupService) { }

  async ngOnInit(): Promise<void> {
    let groupsTask = this.GroupService.GetGroups();
    let stocksByGroupTask = this.GroupService.GetStocksByGroup(this.selectedGroup);

    this.groups = await groupsTask;
    this.stockData = await stocksByGroupTask;
    this.OnChangeGroup.emit(this.stockData);
  }

  async updateStockByGroup():Promise<void> {
    this.stockData = await this.GroupService.GetStocksByGroup(this.selectedGroup);
    this.OnChangeGroup.emit(this.stockData);
  }

  isCheckBoxFilter(val) { return val instanceof CheckBoxFilter; }
  isSelectValueFilter(val) { return val instanceof SelectValueFilter; }
}