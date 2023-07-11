import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroLogicoComponent } from './filtro-logico.component';

describe('FiltroLogicoComponent', () => {
  let component: FiltroLogicoComponent;
  let fixture: ComponentFixture<FiltroLogicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroLogicoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltroLogicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
