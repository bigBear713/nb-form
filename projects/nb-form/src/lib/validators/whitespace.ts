import { AbstractControl, ValidatorFn } from '@angular/forms';
import { isString } from 'lodash-es';
import { NbControlErrTypeEnum } from '../constants';

export const whitespace = (canWhitespace: boolean = true): ValidatorFn => {
  return (control: AbstractControl) => {
    if (canWhitespace) {
      return null;
    }

    if (!control.value) {
      return null;
    }

    if (!isString(control.value)) {
      return null;
    }

    if (control.value.trim()) {
      return null;
    }

    return { [NbControlErrTypeEnum.WHITESPACE]: true };
  };
};
