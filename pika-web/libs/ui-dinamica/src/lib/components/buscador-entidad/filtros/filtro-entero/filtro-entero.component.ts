import { Component, ComponentRef, Input } from '@angular/core';
import { Filtro, OperadorFiltro, Propiedad } from '@pika-web/pika-cliente-api';
import { BuscadorEntidadComponent } from '../../buscador-entidad.component';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NzFormStatusService } from 'ng-zorro-antd/core/form';

@Component({
  selector: 'pika-web-filtro-entero',
  templateUrl: './filtro-entero.component.html',
  styleUrls: ['./filtro-entero.component.less'],
})
export class FiltroEnteroComponent {

  @Input() nombreComponente: string = 'i18nEntero';
  @Input() propiedad: Propiedad;
  _ref: ComponentRef<any>;
  checked: boolean = false
  firstValue?: string;
  secondValue?: string;
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
      select: [null, [Validators.required]],
      first: [null, [Validators.required]],
      second: ['']
    })
  }

  public ObtenerFiltro(): Filtro {
    if (this.validateForm.value.select != this.operadorEntre) {
      if (this.validateForm.valid) {
        return {
          campo: this.childUniqueKey,
          negar: this.validateForm.value.check,
          operador: this.validateForm.value.select,
          valores: [this.validateForm.value.first]
        }
      } else {
        this.invalidForm();
      }
    }
    else {
      if (this.validateForm.valid) {
        return {
          campo: this.childUniqueKey,
          negar: this.validateForm.value.check,
          operador: this.validateForm.value.select,
          valores: [this.validateForm.value.first, this.validateForm.value.second]
        }
      } else {
        this.invalidForm();
      }
    }
    return null!;
  }

  invalidForm() {
    Object.values(this.validateForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        if (!this.validateValues()) {
          control.updateValueAndValidity({ onlySelf: true });
        }
      }
    });
  }

  requiredChange(value: string) {
    if (value == this.operadorEntre) {
      this.validateForm.get('second')!.setValidators(Validators.required);
    } else {
      this.validateForm.get('second')!.clearValidators();
      this.validateForm.get('second')!.markAsPristine();
    }
    this.validateForm.get('second')!.updateValueAndValidity();
  }

  operatorOptions() {
    this.operatorArray.push({ label: OperadorFiltro.Igual, value: OperadorFiltro.Igual });
    this.operatorArray.push({ label: OperadorFiltro.Entre, value: OperadorFiltro.Entre });
    this.operatorArray.push({ label: OperadorFiltro.Mayor, value: OperadorFiltro.Mayor });
    this.operatorArray.push({ label: OperadorFiltro.MayorIgual, value: OperadorFiltro.MayorIgual });
    this.operatorArray.push({ label: OperadorFiltro.Menor, value: OperadorFiltro.Menor });
    this.operatorArray.push({ label: OperadorFiltro.MenorIgual, value: OperadorFiltro.MenorIgual });
    this.operadorEntre = OperadorFiltro.Entre
  }

  removeObject() {
    this.parentRef.isNotSelected(this.childUniqueKey);
    this._ref.destroy();
  }

  validateValues() {
    if (this.validateForm.value.second < this.validateForm.value.first) {
      this.validateForm.controls['second'].setErrors({ error: true })
      return true
    } else {
      return false
    }
  }

}
