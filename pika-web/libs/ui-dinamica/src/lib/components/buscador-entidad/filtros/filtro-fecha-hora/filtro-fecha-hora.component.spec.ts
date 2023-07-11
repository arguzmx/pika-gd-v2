import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroFechaHoraComponent } from './filtro-fecha-hora.component';

describe('FiltroFechaHoraComponent', () => {
  let component: FiltroFechaHoraComponent;
  let fixture: ComponentFixture<FiltroFechaHoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroFechaHoraComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltroFechaHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
