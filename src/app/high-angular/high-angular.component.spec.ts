import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighAngularComponent } from './high-angular.component';

describe('HighAngularComponent', () => {
  let component: HighAngularComponent;
  let fixture: ComponentFixture<HighAngularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighAngularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
