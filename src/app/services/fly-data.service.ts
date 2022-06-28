import { Injectable } from '@angular/core';

@Injectable()
export class FlyDataService {
  constructor() {}
  public whereF: any;
  public whereT: any;
  public whenF: any;

  public passengersN: any;
  public sumP: any;
  public price: any;
  public destinationC:any;
  public passengersI:any;
  public sumC:any;
  public bookedS: any =[];
  public luggageC = 0;

  public isBarcelona = false;
  public isOttawa = false;
  public isRio = false;

  public currentDate = new Date();

}

