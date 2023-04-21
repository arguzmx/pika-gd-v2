import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscadorEntidadComponent } from './buscador-entidad.component';

describe('BuscadorEntidadComponent', () => {
  let component: BuscadorEntidadComponent;
  let fixture: ComponentFixture<BuscadorEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorEntidadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscadorEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
