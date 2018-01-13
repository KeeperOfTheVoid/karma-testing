import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
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

  clearForm() {
    this.registerForm.reset();
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
      firstName: ['', [Validators.required, Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.maxLength(40)]],
      confirmEmail: ['', [Validators.required, Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.maxLength(25)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(25)]],
    });
  }

  /**
   * Submits our Register Form
   * 
   * Currently, just sets our payload and logs to console
   */
  submitRegisterForm(post) {
    const registerForm = {
      firstName: post.firstName,
      lastName: post.lastName,
      email: post.email,
      confirmEmail: post.confirmEmail,
      password: post.password,
      confirmPassword: post.confirmPassword
    }

    console.log('We\'re submitting our register form!!');
    console.log('Register Form', registerForm);
    console.log('Clearing form');
    
    this.clearForm();
  }

}
