import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsLoginComponent } from './shops-login.component';

describe('ShopsLoginComponent', () => {
  let component: ShopsLoginComponent;
  let fixture: ComponentFixture<ShopsLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopsLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
