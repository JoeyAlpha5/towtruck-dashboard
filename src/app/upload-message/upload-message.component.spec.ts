import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMessageComponent } from './upload-message.component';

describe('UploadMessageComponent', () => {
  let component: UploadMessageComponent;
  let fixture: ComponentFixture<UploadMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
