import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SingupComponent } from '../singup/singup.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FlyDataService } from 'src/app/services/fly-data.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  public loginForm!: FormGroup;
  public submitted = false;
  public isBarcelona = false;
  public isOttawa = false;
  public isRio =false;

  constructor(private route:Router,
    public activeLogin: NgbActiveModal,
    public singUpService: NgbModal,
    private formBuilder:FormBuilder, private http: HttpClient, public flyData:FlyDataService
    
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]]
    })
  }
  get f() { return this.loginForm.controls; }
  login(){
    this.submitted = true;

    if (this.loginForm.invalid) {
        return;
    }
    this.http.get<any>("http://localhost:3000/singupUsers").subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        this.activeLogin.close();
        this.route.navigate(['/flight-details']);
      } else{
        alert("Nie znaleziono użytkownika")
      }
    },err=>{
      alert("Coś poszło nie tak!")
    })


    if(this.flyData.whereT=="Barcelona"){
      this.isBarcelona =true;
      this.flyData.isBarcelona = this.isBarcelona;

    }
    else if(this.flyData.whereT=="Ottawa"){
      this.isOttawa = true;
      this.flyData.isOttawa = this.isOttawa;
    }
    else{
      this.isRio = true;
      this.flyData.isRio= this.isRio;
    }
  }
  checkSingUp(){
    const singUp = this.singUpService.open(SingupComponent);
  }
}
