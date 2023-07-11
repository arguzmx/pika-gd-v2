import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroTextoIndexadoComponent } from './filtro-texto-indexado.component';

describe('FiltroTextoIndexadoComponent', () => {
  let component: FiltroTextoIndexadoComponent;
  let fixture: ComponentFixture<FiltroTextoIndexadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroTextoIndexadoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltroTextoIndexadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
