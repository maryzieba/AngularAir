import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { FlyDataService } from './services/fly-data.service';
import { LogComponent } from './components/log/log.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { SingupComponent } from './components/singup/singup.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';
import { SummaryComponent } from './components/summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LogComponent,
    SingupComponent,
    FlightDetailsComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [FlyDataService],
  bootstrap: [AppComponent, LogComponent],
  entryComponents:[LogComponent, SingupComponent]
})
export class AppModule { }
