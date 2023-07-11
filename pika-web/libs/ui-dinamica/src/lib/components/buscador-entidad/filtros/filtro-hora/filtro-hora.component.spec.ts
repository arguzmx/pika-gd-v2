import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroHoraComponent } from './filtro-hora.component';

describe('FiltroHoraComponent', () => {
  let component: FiltroHoraComponent;
  let fixture: ComponentFixture<FiltroHoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroHoraComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltroHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
