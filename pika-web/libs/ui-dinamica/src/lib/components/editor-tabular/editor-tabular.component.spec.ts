import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorTabularComponent } from './editor-tabular.component';

describe('EditorTabularComponent', () => {
  let component: EditorTabularComponent;
  let fixture: ComponentFixture<EditorTabularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorTabularComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorTabularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
