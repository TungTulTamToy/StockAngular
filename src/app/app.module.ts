import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { StockGridComponent } from './components/stock-grid/stock-grid.component';
import { StockService } from "app/services/stock-service/stock.service";
import { SafeNumberPipe } from "app/pipes/safe-number/safe-number.pipe";
import { DecimalPipe } from "@angular/common";
import { StockViewComponent } from './components/stock-view/stock-view.component';
import { PageNotFoundComponent } from './components/not-found/not-found.component';
import { StockNotificationService } from "app/services/stock-notification/stock-notification.service";

const appRoutes: Routes = [
  { path: 'view', component: StockViewComponent },
  { path: 'about', component: PageNotFoundComponent },
  { path: '',   redirectTo: '/view', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [StockNotificationService,StockService,DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
