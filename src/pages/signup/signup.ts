import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor() {
  }

  onSignup(form: NgForm) {
    console.log(form.value.password);
  }
  
}
