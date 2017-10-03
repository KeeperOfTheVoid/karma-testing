import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.css']
})
export class ForgotPasswordFormComponent implements OnInit {

  // Error Messages
  forgotPasswordError: string = undefined;
  forgotPasswordResponse: string = undefined;

  // Form models
  forgotPassword = {};

  // Flags
  recaptchaLoaded: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  /**
 * Clears the forgot password form AND
 * resets the recaptcha.
 */
clearForgotPasswordForm() {
  this.forgotPassword = {};
  this.forgotPasswordError = undefined;
  if (this.forgotPassword) {
    this.forgotPasswordResponse = undefined;
    // TODO Find correct way to do this
    /* login.forgotPasswordForm.$setPristine();
    login.forgotPasswordForm.$setUntouched(); */
    if (this.recaptchaLoaded) {
      //vcRecaptchaService.reload(login.widgetId);
    }
  }
}

  /**
 * Submits the users request to reset the password.
 */
submitForgotPassword() {
  //login.forgotPassword.recaptcha = vcRecaptchaService.getResponse(login.widgetId);
  /* CustomerService.forgotPassword(login.forgotPassword)
    .then(forgotPasswordSuccess)
    .catch(forgotPasswordFail); */

  function forgotPasswordSuccess() {
    this.disableSubmit = false;
  }

  function forgotPasswordFail() {
    this.disableSubmit = false;
    this.forgotPasswordError = 'There was an error submitting your request. Please try again.';
  }

  this.forgotPasswordResponse = "We have sent you an email with a link to reset your password.";
}

}
