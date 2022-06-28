import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {
  public singupForm !: FormGroup;

  constructor(
    public activeSingup: NgbActiveModal, 
    private formBuilder: FormBuilder, 
    private http: HttpClient) { }

  ngOnInit(): void {
    this.singupForm=this.formBuilder.group({
      name:['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      surname:['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      email:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
singUp(){
  this.http.post<any>("http://localhost:3000/singupUsers", this.singupForm.value).subscribe(res=>{
    this.activeSingup.close();
  },err=>{
    alert("Coś poszło nie tak")
  })
}
}
