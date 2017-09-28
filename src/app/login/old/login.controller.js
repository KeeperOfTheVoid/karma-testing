(function () {
    'use strict';

    angular.module('hebApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$rootScope', '$log', '$state', 'CustomerService', 'AuthenticationService', 'appConfig',
        'OverlayService', 'CART_OPERATIONS', 'AUTHENTICATION_OPERATIONS', 'vcRecaptchaService', 'promiseTracker'];
    function LoginController($scope, $rootScope, $log, $state, CustomerService, AuthenticationService, appConfig,
                             OverlayService, CART_OPERATIONS, AUTHENTICATION_OPERATIONS, vcRecaptchaService, promiseTracker) {

        var login = this;
        var DUPLICATE_EMAIL_ERROR = 'That email is already in use. Please try again.';
        var DEFAULT_REGISTRATION_ERROR = 'There was an error registering as a new user. Please try again.';

        login.state = $state;
        login.loadingTracker = promiseTracker();

        // Error messages
        login.loginError = undefined;
        login.registerError = undefined;
        login.forgotPasswordError = undefined;
        login.forgotPasswordResponse = undefined;

        // Page variables
        login.recaptchaKey = appConfig.RECAPTCHA_KEY;

        // Form models
        login.login = {};
        login.register = {};
        login.forgotPassword = {};

        // Flags
        login.isLogin = true;
        login.isRegister = false;
        login.isForgotPassword = false;
        login.disableSubmit = false;
        login.promoCheckbox = true;
        login.recaptchaLoaded = false;

        // Public methods available to the HTML
        login.submitLogin = submitLogin;
        login.submitRegister = submitRegister;
        login.submitForgotPassword = submitForgotPassword;
        login.toggleView = toggleView;
        login.toggleOverlay = toggleOverlay;
        login.toggleForgotPassword = toggleForgotPassword;
        login.setWidgetId = setWidgetId;

        //test-code
        // Methods not used in HTML but need testing
        login.clearLoginForm = clearLoginForm;
        login.clearRegisterForm = clearRegisterForm;
        login.clearForgotPasswordForm = clearForgotPasswordForm;
        //end-test-code

        /**
         * Listener for overlay-close. On broadcast will clear both forms and
         * default to the login form.
         */
        $scope.$on('login.close', function () {
            clearLoginForm();
            clearRegisterForm();
            clearForgotPasswordForm();
            login.isLogin = true;
            login.isForgotPassword = false;
        });

        function clearLoginForm() {
            login.login = {};
            login.loginError = undefined;
            if (login.loginForm) {
                login.login.username = '';
                login.loginForm.$setPristine();
                login.loginForm.$setUntouched();
            }
        }

        function clearRegisterForm() {
            login.register = {};
            login.registerError = undefined;
            if (login.registerForm) {
                login.register.emailAddress = '';
                login.register.emailConfirm = '';
                login.register.password = '';
                login.register.passwordConfirm = '';
                login.registerForm.$setPristine();
                login.registerForm.$setUntouched();
            }
        }

        /**
         * Clears the forgot password form AND
         * resets the recaptcha.
         */
        function clearForgotPasswordForm() {
            login.forgotPassword = {};
            login.forgotPasswordError = undefined;
            if (login.forgotPassword) {
                login.forgotPasswordResponse = undefined;
                login.forgotPasswordForm.$setPristine();
                login.forgotPasswordForm.$setUntouched();
                if (login.recaptchaLoaded) {
                    vcRecaptchaService.reload(login.widgetId);
                }
            }
        }

        /**
         * Handles log in request and handles errors. Should only contain emailAddress and password
         */
        function submitLogin() {
            //login.loadingTracker.addPromise(login.promise);
            login.disableSubmit = true;
            // Invalidate current user
            AuthenticationService.invalidate();
            AuthenticationService.login(login.login.username, login.login.password, login.loadingTracker)
                .then(loginSuccess)
                .catch(loginFailure);

            function loginSuccess() {
                login.disableSubmit = false;
                $rootScope.$broadcast(CART_OPERATIONS.changeItemCount);
                $rootScope.$broadcast(AUTHENTICATION_OPERATIONS.login);
                toggleOverlay();
                clearLoginForm();
            }

            function loginFailure(data) {
                login.disableSubmit = false;
                if (data.status == 401) {
                    login.loginError = data.data.message[0].message;
                } else if (data.status == 403) {
                    login.loginError = 'User is not authorized to access this application';
                } else if (data.status == 429) {
                    login.loginError = 'This account has been locked. After 24 hours your account will be automatically unlocked. For immediate access, reset your password by clicking the \"Forgot Password\" link below.'
                }else {
                    login.loginError = 'An unexpected error has occurred';
                }
            }
        }

        /**
         * Handles user registration request and handles errors. Should contain full object.
         */
        function submitRegister() {
            login.disableSubmit = true;
            login.register.username = login.register.emailAddress;
            login.register.receiveEmail = login.promoCheckbox;
            CustomerService.register(login.register, login.loadingTracker)
                .then(registerSuccess)
                .catch(registerFail);

            function registerSuccess() {
                login.disableSubmit = false;
                login.login.username = login.register.username;
                login.login.password = login.register.password;
                submitLogin();
                clearRegisterForm();
            }

            function registerFail(error) {
                $log.error(error);
                login.disableSubmit = false;
                if(error.data.duplicateEmailAddress){
                    login.registerError = DUPLICATE_EMAIL_ERROR;
                } else{
                    login.registerError = DEFAULT_REGISTRATION_ERROR;
                }
            }
        }

        /**
         * Submits the users request to reset the password.
         */
        function submitForgotPassword() {
            login.forgotPassword.recaptcha = vcRecaptchaService.getResponse(login.widgetId);
            CustomerService.forgotPassword(login.forgotPassword)
                .then(forgotPasswordSuccess)
                .catch(forgotPasswordFail);

            function forgotPasswordSuccess() {
                login.disableSubmit = false;
            }

            function forgotPasswordFail() {
                login.disableSubmit = false;
                login.forgotPasswordError = 'There was an error submitting your request. Please try again.';
            }

            login.forgotPasswordResponse = "We have sent you an email with a link to reset your password.";
        }

        /**
         * Sets a boolean for the recaptcha being loaded.
         */
        function setWidgetId(widgetId) {
            login.widgetId = widgetId;
            login.recaptchaLoaded = true;
        }

        /**
         * Toggles the forgot password view in the overlay
         * on/off.
         */
        function toggleForgotPassword() {
            login.isLogin = false;
            login.isForgotPassword = !login.isForgotPassword;
        }

        /**
         * Toggles the login/register views
         */
        function toggleView() {
            clearRegisterForm();
            clearLoginForm();
            clearForgotPasswordForm();
            login.isLogin = !login.isLogin;
            login.isForgotPassword = false;
        }

        /**
         * Toggles the overlay opened/closed
         */
        function toggleOverlay() {
            var directiveScope = OverlayService.get('login');
            directiveScope.toggleOverlay();
        }
    }
})();
