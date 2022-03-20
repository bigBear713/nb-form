import { AbstractControl, ValidatorFn } from '@angular/forms';
import { NbControlErrTypeEnum } from '../constants';

export const fileSize = (fileSize: { max?: number; min?: number }): ValidatorFn => {
  return (control: AbstractControl) => {
    const file = control.value;

    if (!(file instanceof File)) {
      return null;
    }

    if (fileSize.max && file.size > fileSize.max) {
      return { [NbControlErrTypeEnum.FILE_MAX_SIZE]: true };
    }

    if (fileSize.min && file.size < fileSize.min) {
      return { [NbControlErrTypeEnum.FILE_MIN_SIZE]: true };
    }

    return null;
  };
};
