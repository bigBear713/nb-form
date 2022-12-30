import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormGroup, ValidatorFn } from '@angular/forms';
import { isEqual } from 'lodash-es';
import { combineLatest, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, startWith, takeUntil, tap } from 'rxjs/operators';
import { formValidatorStrategies } from '../constants';
import { INbControlConfig, NbAbstractControl } from '../models';
import { NbFormToolsService } from './form-tools.service';

interface IComparedControls { target: AbstractControl; compared: AbstractControl };

@Injectable({
  providedIn: 'root'
})
export class NbFormService {

  constructor(private formTools: NbFormToolsService) { }

  getValidatorsFromControlConfig(config: INbControlConfig): ValidatorFn[] {
    const strategies: { [key: string]: any } = formValidatorStrategies;
    return Object.keys(config)
      .filter(key => !!strategies[key]?.(config))
      .map(key => strategies[key]?.(config));
  }

  markAllAsDirty(control: NbAbstractControl, opts?: { onlySelf?: boolean; emitEvent?: boolean; }): void {
    control?.markAsDirty(opts);

    const fn = (controlItem: NbAbstractControl): void => this.markAllAsDirty(controlItem, opts)
    if (control instanceof UntypedFormArray) {
      this.formTools.doFormArrayFn(control, fn);
    } else if (control instanceof UntypedFormGroup) {
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
    if (control instanceof UntypedFormArray) {
      this.formTools.doFormArrayFn(control, fn);
    } else if (control instanceof UntypedFormGroup) {
      this.formTools.doFormGroupFn(control, fn);
    }
  }

  updateEqualControlsValidities(controls: IComparedControls, destroy$?: Subject<any>): Subscription {
    const { target, compared } = controls;
    return combineLatest([
      target.statusChanges.pipe(startWith(target.status)),
      compared.statusChanges.pipe(startWith(compared.status)),
    ]).pipe(
      distinctUntilChanged((prev, curr) => isEqual(prev, curr)),
      destroy$ ? takeUntil(destroy$) : tap(() => { })
    ).subscribe(_ => {
      target.updateValueAndValidity();
      compared.updateValueAndValidity();
    });
  }

}
