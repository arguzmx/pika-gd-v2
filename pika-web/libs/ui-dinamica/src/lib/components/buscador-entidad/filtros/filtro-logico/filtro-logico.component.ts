import { Component, ComponentRef, Input } from '@angular/core';
import { Filtro, OperadorFiltro, Propiedad } from '@pika-web/pika-cliente-api';
import { BuscadorEntidadComponent } from '../../buscador-entidad.component';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { fr_BE } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'pika-web-filtro-logico',
  templateUrl: './filtro-logico.component.html',
  styleUrls: ['./filtro-logico.component.less'],
})
export class FiltroLogicoComponent {

  @Input() nombreComponente: string = 'i18nLogico';
  @Input() propiedad: Propiedad;
  _ref: ComponentRef<any>;
  checked: boolean = false;
  firstValue?: string;
  operatorArray: any[] = []
  selectValue: any;
  operadorEntre: string;
  childUniqueKey: string;
  parentRef: BuscadorEntidadComponent;
  validateForm!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {

  }

  ngOnInit(): void {
    this.createForm();
    this.operatorOptions();
  }

  createForm() {
    this.validateForm = this.fb.group({
      check: [false],
      select: [OperadorFiltro.Igual],
      value: [null, [Validators.required]]
    })
  }

  operatorOptions() {
    this.operatorArray.push({ label: OperadorFiltro.Igual, value: OperadorFiltro.Igual });
  }

  public ObtenerFiltro(): Filtro {
    if (this.validateForm.valid) {
      return {
        campo: this.childUniqueKey,
        negar: this.validateForm.value.check,
        operador: this.validateForm.value.select,
        valores: [this.validateForm.value.value]
      }
    } else {
      this.invalidaForm();
    }
    return null!;
  }

  invalidaForm() {
    Object.values(this.validateForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  removeObject() {
    this.parentRef.isNotSelected(this.childUniqueKey);
    this._ref.destroy();
  }

}
