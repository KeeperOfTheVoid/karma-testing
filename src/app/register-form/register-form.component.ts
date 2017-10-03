import { Component, OnInit } from '@angular/core';

import { Register } from './model/register';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  DUPLICATE_EMAIL_ERROR = 'That email is already in use. Please try again.';
  DEFAULT_REGISTRATION_ERROR = 'There was an error registering as a new user. Please try again.';

  // Error Messages
  registerError: string = undefined;

  // Form models
  register = new Register(null, null, null, null, null, null);

  // Flags
  isRegister: boolean = false;
  disableSubmit: boolean = false;
  promoCheckbox: boolean = true;

  constructor() {
  }

  ngOnInit() {
  }

  clearRegisterForm() {
    this.register = new Register(null, null, null, null, null, null);
    this.registerError = undefined;
    if (this.registerForm) {
      this.register.emailAddress = '';
      this.register.emailConfirm = '';
      this.register.password = '';
      this.register.passwordConfirm = '';
      // TODO Find correct way to do this
      /* this.registerForm.$setPristine();
      this.registerForm.$setUntouched(); */
    }
  }

  /**
 * Handles user registration request and handles errors. Should contain full object.
 */
  submitRegister() {
    this.disableSubmit = true;
    this.register.username = this.register.emailAddress;
    this.register.receiveEmail = this.promoCheckbox;
    /* CustomerService.register(this.register, login.loadingTracker)
      .then(registerSuccess)
      .catch(registerFail); */

    function registerSuccess() {
      this.disableSubmit = false;
      this.login.username = this.register.username;
      this.login.password = this.register.password;
      //submitLogin();
      this.clearRegisterForm();
    }

    function registerFail(error) {
      //$log.error(error);
      this.disableSubmit = false;
      if (error.data.duplicateEmailAddress) {
        this.registerError = this.DUPLICATE_EMAIL_ERROR;
      } else {
        this.registerError = this.DEFAULT_REGISTRATION_ERROR;
      }
    }
  }
}
