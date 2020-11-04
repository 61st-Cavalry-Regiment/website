import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QRDComponent } from './qrd.component';

describe('QRDComponent', () => {
  let component: QRDComponent;
  let fixture: ComponentFixture<QRDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QRDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QRDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
