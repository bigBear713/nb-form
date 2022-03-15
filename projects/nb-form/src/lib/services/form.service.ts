import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, ValidatorFn } from '@angular/forms';
import { INbControlConfig } from '../models';
import { NbFormToolsService } from './form-tools.service';

type NbAbstractControl = AbstractControl | null | undefined;

@Injectable({
  providedIn: 'root'
})
export class NbFormService {

  constructor(private formTools: NbFormToolsService) { }

  getValidatorsFromControlConfig(config: INbControlConfig): ValidatorFn[] {
    const strategies: { [key: string]: any } = this.formTools.getFormValidatorStrategies();
    const validators: ValidatorFn[] = [];
    Object.keys(config).forEach((key) => {
      const validatorFn: ValidatorFn | undefined = strategies[key]?.(config);
      if (validatorFn) {
        validators.push(validatorFn);
      }
    });

    return validators;
  }

  markAllAsDirty(control: NbAbstractControl, opts?: { onlySelf?: boolean; emitEvent?: boolean; }): void {
    control?.markAsDirty(opts);

    const fn = (controlItem: NbAbstractControl): void => this.markAllAsDirty(controlItem, opts)
    if (control instanceof FormArray) {
      this.formTools.doFormArrayFn(control, fn);
    } else if (control instanceof FormGroup) {
      this.formTools.doFormGroupFn(control, fn);
    }
  }

  showAllErrInfo(control: NbAbstractControl, opts?: { onlySelf?: boolean; emitEvent?: boolean; }): void {
    control?.markAllAsTouched();
    this.markAllAsDirty(control, opts);
    this.updateAllValueAndValidity(control, opts);
  }

  updateAllValueAndValidity(control: NbAbstractControl, opts?: { onlySelf?: boolean; emitEvent?: boolean; }): void {
    control?.updateValueAndValidity(opts);

    const fn = (controlItem: NbAbstractControl): void => this.updateAllValueAndValidity(controlItem, opts)
    if (control instanceof FormArray) {
      this.formTools.doFormArrayFn(control, fn);
    } else if (control instanceof FormGroup) {
      this.formTools.doFormGroupFn(control, fn);
    }
  }

}
