import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroTextoComponent } from './filtro-texto.component';

describe('FiltroTextoComponent', () => {
  let component: FiltroTextoComponent;
  let fixture: ComponentFixture<FiltroTextoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroTextoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltroTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
