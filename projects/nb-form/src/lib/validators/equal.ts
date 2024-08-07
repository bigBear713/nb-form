import { AbstractControl } from '@angular/forms';
import { isEqual } from 'lodash-es';
import { NbControlErrType } from '../constants';

export const equal = (compared: AbstractControl, immediately: boolean = true) => {
  return (target: AbstractControl) => {
    if (!immediately && !compared.dirty) {
      return null;
    }
    return isEqual(target.value, compared.value) ? null : { [NbControlErrType.EQUAL]: true };
  };
};
