import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardV1Component } from './v1.component';

describe('V1Component', () => {
  let component: DashboardV1Component;
  let fixture: ComponentFixture<DashboardV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardV1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
