import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroEnteroComponent } from './filtro-entero.component';

describe('FiltroEnteroComponent', () => {
  let component: FiltroEnteroComponent;
  let fixture: ComponentFixture<FiltroEnteroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroEnteroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltroEnteroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
