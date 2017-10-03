import { Component } from '@angular/core';

import { Login } from './model/login';
import { Register } from './model/register';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  // Error messages

  registerError: string = undefined;


  // Flags
  isLogin: boolean = true;
  isRegister: boolean = false;
  isForgotPassword: boolean = false;
  disableSubmit: boolean = false;
  promoCheckbox: boolean = true;
  recaptchaLoaded: boolean = false;

  // Public methods available to the HTML
  /* submitLogin = submitLogin;
  submitRegister = submitRegister;
  submitForgotPassword = submitForgotPassword;
  toggleView = toggleView;
  toggleOverlay = this.toggleOverlay;
  toggleForgotPassword = toggleForgotPassword;
  setWidgetId = setWidgetId; */

  //test-code
  // Methods not used in HTML but need testing
  /* clearLoginForm = clearLoginForm;
  clearRegisterForm = clearRegisterForm;
  clearForgotPasswordForm = clearForgotPasswordForm; */
  //end-test-code

  constructor() { }

  /**
   * Listener for overlay-close. On broadcast will clear both forms and
   * default to the login form.
   */
  /* $scope.$on('login.close', function () {
    clearLoginForm();
    clearRegisterForm();
    clearForgotPasswordForm();
    this.isLogin = true;
    this.isForgotPassword = false;
  }); */

/**
 * Sets a boolean for the recaptcha being loaded.
 */
setWidgetId(widgetId) {
  widgetId = widgetId;
  this.recaptchaLoaded = true;
}

/**
 * Toggles the forgot password view in the overlay
 * on/off.
 */
 toggleForgotPassword() {
  this.isLogin = false;
  this.isForgotPassword = !this.isForgotPassword;
}

/**
 * Toggles the login/register views
 */
 toggleView() {
  //this.clearRegisterForm();
  //this.clearLoginForm();
  //clearForgotPasswordForm();
  this.isLogin = !this.isLogin;
  this.isForgotPassword = false;
}

/**
 * Toggles the overlay opened/closed
 */
  toggleOverlay() {
    // TODO Stub Overlay Service
    /* var directiveScope = OverlayService.get('login');
    directiveScope.toggleOverlay(); */
  }
}
