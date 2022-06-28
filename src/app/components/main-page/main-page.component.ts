import { Component, OnInit } from '@angular/core';
import { originCities, destinationCities } from './cities-export';
import { FlyDataService } from 'src/app/services/fly-data.service';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogComponent } from '../log/log.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

public tempCelsius:any;
public sunsetTime:any;
public isDay:any;
public clouds:any;
public isCloudy = false;
public isShow= false;
public city: any;

public choosePassengers = false;

public origin: any= originCities;
public destination: any = destinationCities;
public passengersData: any;
public passengersNumber:any;
public price:any;

  constructor(
    public flyData: FlyDataService,
    public logService: NgbModal
  ) {}

  ngOnInit(): void {
  }

 chosenCity(formValues:NgForm){
    this.city = formValues.value.whereFrom;
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+this.city+"&appid=a5b7f042dfcb70fb144ed3404c8f59d8";
    fetch(url).then((resp)=>resp.json()).then((data)=>{
      this.tempCelsius = (data.main.temp - 272.15).toFixed(0);
      this.sunsetTime = new Date(data.sys.sunset*1000);
      this.isDay =(this.flyData.currentDate.getTime() < this.sunsetTime.getTime());
      this.clouds = data.clouds.all;
      this.isCloudy = (this.clouds > 30);
    })
    this.isShow=true;
  }

  
  getDataFlySearch(formValues:NgForm){
    this.flyData.whereF = formValues.value.whereFrom;
    this.flyData.whereT = formValues.value.whereTo;
    this.flyData.whenF = formValues.value.whenFrom;
    this.flyData.passengersN = formValues.value.passengersNumber;

    this.flyData.destinationC = this.destination;
    const logOpen = this.logService.open(LogComponent);
  }
}