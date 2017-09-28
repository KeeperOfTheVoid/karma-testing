describe('Login Controller', function () {
    var scope,
        $compile,
        element,
        appConfig,
        LoginController,
        $httpBackend,
        overlayService,
        $state,
        vcRecaptchaService;

    beforeEach(module('hebApp'));
    beforeEach(module('hebApp.views'));
    beforeEach(module('hebApp.test'));
    beforeEach(inject(function ($controller, $rootScope, _$compile_, _$httpBackend_, OverlayService, _$state_, _appConfig_) {
        scope = $rootScope.$new();
        $compile = _$compile_;
        $httpBackend = _$httpBackend_;
        appConfig = _appConfig_;
        overlayService = OverlayService;
        $state = _$state_;
        vcRecaptchaService = {
            reload: function() {},
            getResponse: function() {}
        };

        //overlayService.set('login', $rootScope.$new());
        overlayService.get = sinon.stub().returns({
            toggleOverlay: function () {
                return true;
            }
        });

        // expect get from ng-messages-include
        $httpBackend.whenGET('/views/login/login-errors.html')
            .respond(200, angular.element('<div></div>'));

        element = angular.element('<login></login>');
        $compile(element)(scope);
        scope.$apply();

        LoginController = $controller('LoginController', {
            $scope: scope,
            vcRecaptchaService: vcRecaptchaService
        });
    }));

    it('should load the controller', function () {
        expect(LoginController).to.exist;
    });

    describe('- broadcast listener for login.close -', function () {
        it('should clear form, when broadcast is heard', function () {
            LoginController.login.username = 'test';

            LoginController.forgotPasswordForm = {
                $setPristine: sinon.stub(),
                $setUntouched: sinon.stub()
            };

            // broadcast incorrect - should not change fields
            scope.$broadcast('test-fail.close');

            expect(LoginController.login.username).to.equal('test');

            //broadcast correct - should call clear form functions
            scope.$broadcast('login.close');

            expect(LoginController.login.username).to.be.undefined;

        });

        it('should change login flag to true, when broadcast is heard', function(){
            LoginController.forgotPasswordForm = {
                $setPristine: sinon.stub(),
                $setUntouched: sinon.stub()
            };

            LoginController.isLogin = false;
            LoginController.isForgotPassword = true;

            scope.$broadcast('login.close');

            expect(LoginController.isLogin).to.be.true;
            expect(LoginController.isForgotPassword).to.be.false;
        })
    });

    describe('#clearLoginForm', function () {
        it('should clear the login form', function () {
            LoginController.login.username = 'test';
            LoginController.login.password = 'test';
            LoginController.loginError = 'test';

            LoginController.clearLoginForm();

            expect(LoginController.login.username).to.be.undefined;
            expect(LoginController.login.password).to.be.undefined;
            expect(LoginController.loginError).to.be.undefined;
        });
    });

    describe('#clearRegisterForm', function () {
        it('should clear the register form', function () {
            LoginController.register.firstName = 'test';
            LoginController.register.lastName ='test';
            LoginController.register.emailAddress ='test';
            LoginController.register.emailConfirm = 'test';
            LoginController.register.password = 'test';
            LoginController.register.passwordConfirm = 'test';
            LoginController.registerError = 'test';

            LoginController.clearRegisterForm();

            expect(LoginController.register.firstName).to.be.undefined;
            expect(LoginController.register.lastName).to.be.undefined;
            expect(LoginController.register.emailAddress).to.be.undefined;
            expect(LoginController.register.emailConfirm).to.be.undefined;
            expect(LoginController.register.password).to.be.undefined;
            expect(LoginController.register.passwordConfirm).to.be.undefined;
            expect(LoginController.registerError).to.be.undefined;

        });
    });

    describe('#clearForgotPasswordForm', function() {
        it('should clear the forgot password form', function() {
            LoginController.forgotPassword = {someValue: '', anotherValue: '', emailAddress: 'ruiz.eric@heb.com'};
            LoginController.forgotPasswordError = "anError";
            LoginController.forgotPasswordResponse = 'someResponse';

            LoginController.forgotPasswordForm = {
                $setPristine: sinon.stub(),
                $setUntouched: sinon.stub()
            };

            LoginController.clearForgotPasswordForm();

            expect(LoginController.forgotPassword).to.be.empty;
            expect(LoginController.forgotPasswordForm.$setPristine).to.be.calledOnce;
            expect(LoginController.forgotPasswordForm.$setUntouched).to.be.calledOnce;
            expect(LoginController.forgotPasswordError).to.be.undefined;
            expect(LoginController.forgotPasswordResponse).to.be.undefined;
        });
    });

    describe('#submitLogin', function () {
        it('should submit a login to the backend', function () {
            LoginController.submitLogin();
            $httpBackend.expectPOST(appConfig.SECURITY_URL + 'jwt/login')
                .respond({
                    data: {
                        id: 126405,
                        name: 'k@k.comx',
                        roles: ["ROLE_USER"]
                    }
                });
            $httpBackend.flush();
        });
    });

    describe('#submitRegister', function () {
        it('should submit a register to the backend and then a login', function () {
            LoginController.register.username = 'test';
            LoginController.register.password = 'test';

            LoginController.submitRegister();

            $httpBackend.expectPOST(appConfig.CUSTOMER_URL + 'register')
                .respond(200);
            $httpBackend.expectPOST(appConfig.SECURITY_URL + 'jwt/login')
                .respond({
                    data: {
                        id: 126405,
                        name: 'k@k.comx',
                        roles: ["ROLE_USER"]
                    }
                });
            $httpBackend.flush();

        });
    });

    describe('#submitForgotPassword', function () {
        it('should submit a forgotPassword to the backend', function () {
            LoginController.forgotPassword.emailAddress = 'ruiz.eric@heb.com';

            LoginController.submitForgotPassword();

            $httpBackend.expectPOST(appConfig.SECURITY_URL + '/forgot-password')
                .respond(200);
            $httpBackend.flush();
        });
    });

    describe('#setWidgetId', function() {
        it('should set the login.widgetId var', function() {
            LoginController.widgetId = '';

            LoginController.setWidgetId('123');

            expect(LoginController.widgetId).to.equal('123');
        })
    });

    describe('#toggleForgotPassword', function() {
        it('should set isLogin to false and isForgotPassword to !isForgotPassword', function() {
            LoginController.isLogin = true;
            LoginController.isForgotPassword = false;

            LoginController.toggleForgotPassword();

            expect(LoginController.isLogin).to.equal(false);
            expect(LoginController.isForgotPassword).to.equal(true);
        })
    });

    describe('#toggleView', function () {
        it('should clear both forms and change the isLogin flag', function () {
            LoginController.forgotPasswordForm = {};
            LoginController.register.username = 'test';
            LoginController.login.username = 'test';
            LoginController.isLogin = true;
            LoginController.isForgotPassword = true;

            LoginController.forgotPasswordForm = {
                $setPristine: sinon.stub(),
                $setUntouched: sinon.stub()
            };

            LoginController.toggleView();

            expect(LoginController.register.username).to.be.undefined;
            expect(LoginController.login.username).to.be.undefined;
            expect(LoginController.isLogin).to.be.false;
            expect(LoginController.isForgotPassword).to.be.false;
        });
    });
});