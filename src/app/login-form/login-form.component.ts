import {Component, OnInit} from '@angular/core';

import { Login } from './model/login';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  // Error messages
  loginError: string = undefined;

  // Form models
  login = new Login(null,null);

  // Flags
  disableSubmit: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

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
}
