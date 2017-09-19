import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { BannerComponent } from './banner-inline.component';

describe('BannerComponent - Inline', () => {
  let component: BannerComponent;
  let fixture:   ComponentFixture<BannerComponent>;
  let debug:     DebugElement;
  let element:   HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerComponent ] // Declare the test component
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent); // Creates testing module for component
    component = fixture.componentInstance; // Banner Component Test Instance
    fixture.detectChanges();

    // query for the title <h1> by CSS element selector
    debug = fixture.debugElement.query(By.css('h1'));
    element = debug.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display original title', () => {
    fixture.detectChanges();
    expect(element.textContent).toContain(component.title);
  });

  it('should display a different test title', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    expect(element.textContent).toContain('Test Title');
  });

  /**
   * This behavior (or lack of it) is intentional. It
   * gives the tester an opportunity to inspect or change
   * the state of the component before Angular initiates
   * data binding or calls lifecycle hooks.
   *
   * Uncomment to watch test fail
   */
  /* it('no title in the DOM until manually call `detectChanges`', () => {
    expect(element.textContent).toEqual('');
  }); */
});
