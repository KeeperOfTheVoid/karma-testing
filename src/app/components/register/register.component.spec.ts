import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterForm } from '../../models/register-form.model';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  const testRegisterForm: RegisterForm = {
    firstName: 'Jon',
    lastName: 'Snow',
    email: 'snow.jon@castle-black.org',
    confirmEmail: 'snow.jon@castle-black.org',
    password: 'iknownothing',
    confirmPassword: 'iknownothing'
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid', () => {
    component.registerForm.setValue(testRegisterForm);
    expect(component.registerForm.valid).toBeTruthy;
  });

  describe('First Name', () => {
    it('should not be valid - Required', () => {
      const testForm  = {
        firstName: '',
        lastName: 'Snow',
        email: 'snow.jon@castle-black.org',
        confirmEmail: 'snow.jon@castle-black.org',
        password: 'iknownothing',
        confirmPassword: 'iknownothing'
      }
      component.registerForm.setValue(testForm);
      fixture.detectChanges();
      expect(component.registerForm.valid).toBe(false);
    });

    it('should not be valid - Max Length: 25', () => {
      const testForm  = {
        firstName: 'aaaaabbbbbcccccdddddeeeeef',
        lastName: 'Snow',
        email: 'snow.jon@castle-black.org',
        confirmEmail: 'snow.jon@castle-black.org',
        password: 'iknownothing',
        confirmPassword: 'iknownothing'
      }
      component.registerForm.setValue(testForm);
      fixture.detectChanges();
      expect(component.registerForm.valid).toBe(false);
    });
  });

  describe('Last Name', () => {
    it('should not be valid - Required', () => {
      const testForm  = {
        firstName: 'Jon',
        lastName: '',
        email: 'snow.jon@castle-black.org',
        confirmEmail: 'snow.jon@castle-black.org',
        password: 'iknownothing',
        confirmPassword: 'iknownothing'
      }
      component.registerForm.setValue(testForm);
      fixture.detectChanges();
      expect(component.registerForm.valid).toBe(false);
    });

    it('should not be valid - Max Length: 25', () => {
      const testForm  = {
        firstName: 'Jon',
        lastName: 'aaaaabbbbbcccccdddddeeeeef',
        email: 'snow.jon@castle-black.org',
        confirmEmail: 'snow.jon@castle-black.org',
        password: 'iknownothing',
        confirmPassword: 'iknownothing'
      }
      component.registerForm.setValue(testForm);
      fixture.detectChanges();
      expect(component.registerForm.valid).toBe(false);
    });
  });

  describe('Email Address', () => {
    it('should not be valid - Required', () => {
      const testForm  = {
        firstName: 'Jon',
        lastName: 'Snow',
        email: '',
        confirmEmail: 'snow.jon@castle-black.org',
        password: 'iknownothing',
        confirmPassword: 'iknownothing'
      }
      component.registerForm.setValue(testForm);
      fixture.detectChanges();
      expect(component.registerForm.valid).toBe(false);
    });

    it('should not be valid - Max Length: 40', () => {
      const testForm  = {
        firstName: 'Jon',
        lastName: 'Snow',
        email: 'snow.jonsnow.jonsnow.jonsnow.jon@castle-black.org',
        confirmEmail: 'snow.jon@castle-black.org',
        password: 'iknownothing',
        confirmPassword: 'iknownothing'
      }
      component.registerForm.setValue(testForm);
      fixture.detectChanges();
      expect(component.registerForm.valid).toBe(false);
    });

    describe('Confirm Email Address', () => {
      it('should not be valid - Required', () => {
        const testForm  = {
          firstName: 'Jon',
          lastName: 'Snow',
          email: 'snow.jon@castle-black.org',
          confirmEmail: '',
          password: 'iknownothing',
          confirmPassword: 'iknownothing'
        }
        component.registerForm.setValue(testForm);
        fixture.detectChanges();
        expect(component.registerForm.valid).toBe(false);
      });
  
      it('should not be valid - Max Length: 40', () => {
        const testForm  = {
          firstName: 'Jon',
          lastName: 'Snow',
          email: 'snow.jon@castle-black.org',
          confirmEmail: 'snow.jonsnow.jonsnow.jonsnow.jon@castle-black.org',
          password: 'iknownothing',
          confirmPassword: 'iknownothing'
        }
        component.registerForm.setValue(testForm);
        fixture.detectChanges();
        expect(component.registerForm.valid).toBe(false);
      }); 
    });
  });

  describe('Password', () => {
    it('should not be valid - Required', () => {
      const testForm  = {
        firstName: 'Jon',
        lastName: 'Snow',
        email: 'snow.jon@castle-black.org',
        confirmEmail: 'snow.jon@castle-black.org',
        password: '',
        confirmPassword: 'iknownothing'
      }
      component.registerForm.setValue(testForm);
      fixture.detectChanges();
      expect(component.registerForm.valid).toBe(false);
    });

    it('should not be valid - Max Length: 25', () => {
      const testForm  = {
        firstName: 'Jon',
        lastName: 'Snow',
        email: 'snow.jon@castle-black.org',
        confirmEmail: 'snow.jon@castle-black.org',
        password: 'iknownothingiknownothingiknownothing',
        confirmPassword: 'iknownothing'
      }
      component.registerForm.setValue(testForm);
      fixture.detectChanges();
      expect(component.registerForm.valid).toBe(false);
    });

    describe('Confirm Password', () => {
      it('should not be valid - Required', () => {
        const testForm  = {
          firstName: 'Jon',
          lastName: 'Snow',
          email: 'snow.jon@castle-black.org',
          confirmEmail: 'snow.jon@castle-black.org',
          password: 'iknownothing',
          confirmPassword: ''
        }
        component.registerForm.setValue(testForm);
        fixture.detectChanges();
        expect(component.registerForm.valid).toBe(false);
      });
  
      it('should not be valid - Max Length: 40', () => {
        const testForm  = {
          firstName: 'Jon',
          lastName: 'Snow',
          email: 'snow.jon@castle-black.org',
          confirmEmail: 'snow.jon@castle-black.org',
          password: 'iknownothing',
          confirmPassword: 'iknownothingiknownothingiknownothing'
        }
        component.registerForm.setValue(testForm);
        fixture.detectChanges();
        expect(component.registerForm.valid).toBe(false);
      }); 
    });
  });

  describe('#clearForm', () => {
    it('should clear the form', () => {
      const testForm: RegisterForm = {
        firstName: null,
        lastName: null,
        email: null,
        confirmEmail: null,
        password: null,
        confirmPassword: null
      }
      component.registerForm.setValue(testRegisterForm);
      fixture.detectChanges();
      component.clearForm();
      console.log(component.registerForm.value);
      
      expect(component.registerForm.value).toEqual(testForm);
    });
  });
});
