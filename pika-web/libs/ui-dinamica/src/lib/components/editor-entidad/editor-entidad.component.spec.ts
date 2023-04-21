import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorEntidadComponent } from './editor-entidad.component';

describe('EditorEntidadComponent', () => {
  let component: EditorEntidadComponent;
  let fixture: ComponentFixture<EditorEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorEntidadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
