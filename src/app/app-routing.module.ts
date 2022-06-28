import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SingupComponent } from './components/singup/singup.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';
import { SummaryComponent } from './components/summary/summary.component';



const routes: Routes = [
  {path: '', redirectTo:'main', pathMatch:'full' },
  {path: 'main', component: MainPageComponent},
  {path: 'singup', component: SingupComponent},
  {path:'flight-details', component: FlightDetailsComponent},
  {path: 'summary', component: SummaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
