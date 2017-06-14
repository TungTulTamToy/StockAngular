import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DecimalPipe } from "@angular/common";

import { AppComponent } from './app.component';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { StockGridComponent } from './components/stock-grid/stock-grid.component';
import { StockService } from "./services/stock-service/stock.service";
import { SafeNumberPipe } from "./pipes/safe-number/safe-number.pipe";
import { StockViewComponent } from './components/stock-view/stock-view.component';
import { PageNotFoundComponent } from './components/not-found/not-found.component';
import { StockNotificationService } from "./services/stock-notification/stock-notification.service";
import { AppRoutingModule } from "./modules/app-routing/app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    SearchPanelComponent,
    StockGridComponent,
    SafeNumberPipe,
    StockViewComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [StockNotificationService,StockService,DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
