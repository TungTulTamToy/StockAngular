import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { StockViewComponent } from "app/components/stock-view/stock-view.component";
import { PageNotFoundComponent } from "app/components/not-found/not-found.component";

const appRoutes: Routes = [
  { path: 'view', component: StockViewComponent },
  { path: 'about', component: PageNotFoundComponent },
  { path: '',   redirectTo: '/view', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
