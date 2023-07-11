import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroListaSeleccionSimpleComponent } from './filtro-lista-seleccion-simple.component';

describe('FiltroListaSeleccionSimpleComponent', () => {
  let component: FiltroListaSeleccionSimpleComponent;
  let fixture: ComponentFixture<FiltroListaSeleccionSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroListaSeleccionSimpleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltroListaSeleccionSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
