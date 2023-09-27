import { Component, ComponentRef, Input } from '@angular/core';
import { Filtro, OperadorFiltro, Propiedad } from '@pika-web/pika-cliente-api';
import { BuscadorEntidadComponent } from '../../buscador-entidad.component';
import { Subject } from 'rxjs';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pika-web-filtro-texto-indexado',
  templateUrl: './filtro-texto-indexado.component.html',
  styleUrls: ['./filtro-texto-indexado.component.less'],
})
export class FiltroTextoIndexadoComponent {

  @Input() nombreComponente: string = 'i18nTextoIndexado';
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
      select: [null, [Validators.required]],
      valueText: [null, [Validators.required]]
    })
  }

  operatorOptions() {
    this.operatorArray.push({ label: OperadorFiltro.ComienzaCon, value: OperadorFiltro.ComienzaCon });
    this.operatorArray.push({ label: OperadorFiltro.Contiene, value: OperadorFiltro.Contiene });
    this.operatorArray.push({ label: OperadorFiltro.Igual, value: OperadorFiltro.Igual });
    this.operatorArray.push({ label: OperadorFiltro.TerminaCon, value: OperadorFiltro.TerminaCon });
    this.operatorArray.push({ label: OperadorFiltro.TextoCompleto, value: OperadorFiltro.TextoCompleto });
  }

  public ObtenerFiltro(): Filtro {
    if (this.validateForm.valid) {
      return {
        campo: this.childUniqueKey,
        negar: this.validateForm.value.check,
        operador: this.validateForm.value.select,
        valores: [this.validateForm.value.valueText]
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
