import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTrackingComponent } from './service-tracking.component';

describe('ServiceTrackingComponent', () => {
  let component: ServiceTrackingComponent;
  let fixture: ComponentFixture<ServiceTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceTrackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
