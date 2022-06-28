import { Component, OnInit } from '@angular/core';
import { FlyDataService } from 'src/app/services/fly-data.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {

  public seatData = this.flyData.bookedS
  public passengers = Array.from({length:(this.flyData.passengersN)}, _ =>({name:'',luggage:''}))
  public summarySum: number=0;

  public price: any;
  public sumPrice: any;
  
  public seatsLeft:any;
  public chosenSeat:any;

  public counter = 0;

  constructor(public flyData: FlyDataService,
    public route: Router
  ) {}
  

  ngOnInit(): void {
    this.seatsLeft = this.flyData.passengersN;
    

    if(this.flyData.whereT=='Barcelona' && this.flyData.whereF=='Kraków' ){
      this.price = this.flyData.destinationC[0].priceKRA
    }else if (this.flyData.whereT=='Barcelona' && this.flyData.whereF=='Warszawa' ) {
      this.price = this.flyData.destinationC[0].priceWAW
    }else if (this.flyData.whereT=='Ottawa' && this.flyData.whereF=='Kraków' ){
      this.price = this.flyData.destinationC[1].priceKRA
    }else if (this.flyData.whereT=='Ottawa' && this.flyData.whereF=='Warszawa' ){
      this.price = this.flyData.destinationC[1].priceWAW
    }else if(this.flyData.whereT=='Rio de Janeiro' && this.flyData.whereF=='Kraków' ){
      this.price = this.flyData.destinationC[2].priceKRA
    }else {this.price=this.flyData.destinationC[2].priceWAW}

    this.sumPrice=(this.price * this.flyData.passengersN);
    this.flyData.sumP=this.sumPrice;
    this.flyData.price = this.price;
  }

  onClick($event:Event) {
    const target = ($event.target as Element);
    const seat = (target.closest('.st14') as Element);
    this.chosenSeat = seat.getAttribute('id');

    if (this.flyData.bookedS.includes(this.chosenSeat)) {
      seat.removeAttribute('style');
      seat.setAttribute('class', 'free st14');

      this.flyData.bookedS = this.flyData.bookedS.filter((item:any) => {
        return item !== this.chosenSeat;
      });
    } else if (this.flyData.passengersN > this.flyData.bookedS.length) {
      this.flyData.bookedS.push(this.chosenSeat);
      seat.removeAttribute('style');
      seat.setAttribute('class', 'occupied st14');
    }
    this.seatsLeft = this.flyData.passengersN - this.flyData.bookedS.length;
  }


  save(formValues: NgForm){
    this.flyData.passengersI=this.passengers;
    for(let i=0; i<this.passengers.length; i++){
      const passengersItem = this.passengers[i];
      if(passengersItem.luggage==='rejestrowany'){
        this.summarySum=(this.summarySum+170);
        this.counter++
      }
    }
    this.flyData.sumC=this.summarySum+this.sumPrice;

    if (this.flyData.bookedS.length !== this.flyData.passengersN) {
          alert("nie wybrano wszystkich miejsc")
        }else{
          this.flyData.luggageC=this.counter;
              this.route.navigate(['/summary']);
        }
  }
}

