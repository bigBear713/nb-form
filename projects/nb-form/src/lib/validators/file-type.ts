import { AbstractControl, ValidatorFn } from '@angular/forms';
import { NbControlErrTypeEnum } from '../constants';

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
      return { [NbControlErrTypeEnum.FILE_TYPE]: true };
    }

    return null;
  };
};
