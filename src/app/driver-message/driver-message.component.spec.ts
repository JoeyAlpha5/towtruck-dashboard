import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverMessageComponent } from './driver-message.component';

describe('DriverMessageComponent', () => {
  let component: DriverMessageComponent;
  let fixture: ComponentFixture<DriverMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
