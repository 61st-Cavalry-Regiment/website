import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitPhotosComponent } from './unit-photos.component';

describe('UnitPhotosComponent', () => {
  let component: UnitPhotosComponent;
  let fixture: ComponentFixture<UnitPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
