import { AbstractControl, ValidatorFn } from '@angular/forms';
import { NbControlErrType } from '../constants';

export const fileType = (types: string[]): ValidatorFn => {
  return (control: AbstractControl) => {
    const file = control.value;

    if (!(file instanceof File)) {
      return null;
    }

    if (!types.length) {
      return null;
    }

    if (!types.includes(file.type)) {
      return { [NbControlErrType.FILE_TYPE]: true };
    }

    return null;
  };
};
