import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private account: AccountService) {}

  ngOnInit(): void {
    this.onCreateSignupForm();
    console.log(this.signupForm.valid)
  }

  onCreateSignupForm() {
    this.signupForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
      ]),
      userName:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
    });
  }

  onSubmit(){
    this.account.regster(this.signupForm.value).subscribe(()=>{
      console.log("regster")
    },error=>{
      console.log(error)
    })
  }
}
