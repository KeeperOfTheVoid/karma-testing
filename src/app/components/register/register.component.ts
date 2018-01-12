import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Form Group - Register Form
  registerForm: FormGroup;

  // Property for submitted form
  post: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeRegisterForm();
  }

  /**
   * Initializes Register Form
   *
   * Fields being initialized:
   *
   * First Name - Required
   * Last Name - Required
   * Email - Required
   * Confirm Email - Required
   * Card CVV - Required
   * Password - Required
   * Confirm Password - Required
   */
  initializeRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      confirmEmail: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  /**
   * Submits our Register Form
   * 
   * Currently, just logs to console
   */
  submitRegisterForm(post) {
    console.log('We\'re submitting our register form!!');
    console.log('Register Form', post);
    
  }

}
