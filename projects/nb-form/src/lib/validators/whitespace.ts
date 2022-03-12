import { AbstractControl } from '@angular/forms';
import { isString } from 'lodash-es';
import { NbControlErrTypeEnum } from '../constants';

// Veirfy if the string content is all whitespace
export const whitespace = (canWhitespace: boolean = true) => {
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

    return { [NbControlErrTypeEnum.REQUIRED]: true };
  };
};
