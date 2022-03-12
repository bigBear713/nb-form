import { AbstractControl } from '@angular/forms';
import { NbControlErrTypeEnum } from '../constants';

export const fileSize = (fileSize: { maxSize?: number; minSize?: number }) => {
  return (control: AbstractControl) => {
    const file = control.value;

    if (!(file instanceof File)) {
      return null;
    }

    if (fileSize.maxSize && file.size > fileSize.maxSize) {
      return { [NbControlErrTypeEnum.FILE_MAX_SIZE]: true };
    }

    if (fileSize.minSize && file.size < fileSize.minSize) {
      return { [NbControlErrTypeEnum.FILE_MIN_SIZE]: true };
    }

    return null;
  };
};
