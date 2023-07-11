import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroDecimalComponent } from './filtro-decimal.component';

describe('FiltroDecimalComponent', () => {
  let component: FiltroDecimalComponent;
  let fixture: ComponentFixture<FiltroDecimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroDecimalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltroDecimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
