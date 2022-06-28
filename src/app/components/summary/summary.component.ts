import { Component, OnInit } from '@angular/core';
import { FlyDataService } from 'src/app/services/fly-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
public passengersInfo = this.flyData.passengersI;
public kindCurrency:any="";
public exchangeValue = this.flyData.sumC;

public tempCelsius:any;
public sunsetTime:any;
public isDay:any;
public isCloudy:any;
public clouds:any;
public isShow = false;


  constructor(public flyData:FlyDataService, public route: Router) { }

  ngOnInit(): void {
    this.chosenCity();
  }
  chosenCity(){
    let city = this.flyData.whereT;
    let urlwidget = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=a5b7f042dfcb70fb144ed3404c8f59d8";
    fetch(urlwidget).then((resp)=>resp.json()).then((data)=>{
      this.tempCelsius = (data.main.temp - 272.15).toFixed(0);
      this.sunsetTime = new Date(data.sys.sunset*1000);
      this.isDay =(this.flyData.currentDate.getTime() < this.sunsetTime.getTime());
      this.clouds = data.clouds.all;
      this.isCloudy = (this.clouds > 30);
    })
    let choosenDate = new Date(this.flyData.whenF);
    let time = choosenDate.getTime() - this.flyData.currentDate.getTime() ;
    let days = time/(1000*3600*24);
    this.isShow=(days<=16);
    console.log(days);
  }


  getKindCurrency(){
    let currency = this.kindCurrency;
    if(currency === ""){
      this.exchangeValue = this.flyData.sumC;
    }
    else{
    let url = "https://api.nbp.pl/api/exchangerates/rates/a/"+ currency +"/?format=json";
    fetch(url).then((resp)=>resp.json()).then((data)=>{
      this.exchangeValue=((this.flyData.sumC)/(data.rates[0].mid))
    })}
  }

  end(){
    this.route.navigate(['/main']);
    this.flyData.bookedS = [];
    this.flyData.luggageC=0;

  }

}
