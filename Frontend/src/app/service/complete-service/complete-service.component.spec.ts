import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteServiceComponent } from './complete-service.component';

describe('CompleteServiceComponent', () => {
  let component: CompleteServiceComponent;
  let fixture: ComponentFixture<CompleteServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleteServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
