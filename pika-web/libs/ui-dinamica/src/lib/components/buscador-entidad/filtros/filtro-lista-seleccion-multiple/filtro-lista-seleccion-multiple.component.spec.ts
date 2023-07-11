import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroListaSeleccionMultipleComponent } from './filtro-lista-seleccion-multiple.component';

describe('FiltroListaSeleccionMultipleComponent', () => {
  let component: FiltroListaSeleccionMultipleComponent;
  let fixture: ComponentFixture<FiltroListaSeleccionMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroListaSeleccionMultipleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltroListaSeleccionMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
