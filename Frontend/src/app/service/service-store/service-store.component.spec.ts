import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceStoreComponent } from './service-store.component';

describe('ServiceStoreComponent', () => {
  let component: ServiceStoreComponent;
  let fixture: ComponentFixture<ServiceStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
