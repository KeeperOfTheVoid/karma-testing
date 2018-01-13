import { Component } from '@angular/core';

import { Login } from './model/login';
import { Register } from './model/register';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  DUPLICATE_EMAIL_ERROR = 'That email is already in use. Please try again.';
  DEFAULT_REGISTRATION_ERROR = 'There was an error registering as a new user. Please try again.';

  // Error messages
  loginError: string = undefined;
  registerError: string = undefined;
  forgotPasswordError: string = undefined;
  forgotPasswordResponse: string = undefined;

  // Form models
  login = new Login(null,null);
  register = new Register(null, null, null, null, null, null);
  forgotPassword = {};

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

   clearLoginForm() {
    this.login = new Login(null,null);
    this.loginError = undefined;
    if (this.loginForm) {
      this.login.username = '';
      // TODO Find correct way to do this
      /* this.loginForm.$setPristine();
      this.loginForm.$setUntouched(); */
    }
  }

  clearRegisterForm() {
    this.register = new Register(null,null,null,null, null, null);
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
 * Handles log in request and handles errors. Should only contain emailAddress and password
 */
 submitLogin() {
  //login.loadingTracker.addPromise(login.promise);
  this.disableSubmit = true;
  // Invalidate current user
  /* AuthenticationService.invalidate();
  AuthenticationService.login(this.login.username, this.login.password, login.loadingTracker)
    .then(loginSuccess)
    .catch(loginFailure); */

  function loginSuccess() {
    this.disableSubmit = false;
    /* $rootScope.$broadcast(CART_OPERATIONS.changeItemCount);
    $rootScope.$broadcast(AUTHENTICATION_OPERATIONS.login); */
    this.toggleOverlay();
    this.clearLoginForm();
  }

  function loginFailure(data) {
    this.disableSubmit = false;
    if (data.status == 401) {
      this.loginError = data.data.message[0].message;
    } else if (data.status == 403) {
      this.loginError = 'User is not authorized to access this application';
    } else if (data.status == 429) {
      this.loginError = 'This account has been locked. After 24 hours your account will be automatically unlocked. For immediate access, reset your password by clicking the \"Forgot Password\" link below.'
    } else {
      this.loginError = 'An unexpected error has occurred';
    }
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
  this.clearRegisterForm();
  this.clearLoginForm();
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
