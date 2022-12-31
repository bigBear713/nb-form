import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { NbAbstractControl } from '../models';

@Injectable({ providedIn: 'root' })
export class NbFormToolsService {

  constructor() { }

  doFormArrayFn(control: UntypedFormArray, fn: (item: NbAbstractControl) => void): void {
    control.controls.forEach(item => fn(item));
  }

  doFormGroupFn(control: UntypedFormGroup, fn: (item: NbAbstractControl) => void): void {
    Object.keys(control.controls).forEach(key => fn(control.get(key)));
  }

}
