import { AbstractControl, ValidatorFn } from '@angular/forms';
import { NbControlErrType } from '../constants';

export const arrLength = (arrLength: { max?: number; min?: number }): ValidatorFn => {
  return (control: AbstractControl) => {
    const arr = control.value;
    if (!Array.isArray(arr)) {
      return null;
    }

    if (arrLength.max && control.value.length > arrLength.max) {
      return { [NbControlErrType.ARR_MAX_LENGTH]: true };
    }

    if (arrLength.min && control.value.length < arrLength.min) {
      return { [NbControlErrType.ARR_MIN_LENGTH]: true };
    }

    return null;
  };
};
