import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionChartComponent } from './components/transaction-chart/transaction-chart.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AppComponent, TransactionChartComponent],
  imports: [BrowserModule, NgChartsModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
