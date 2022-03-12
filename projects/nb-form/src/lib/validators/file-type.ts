import { AbstractControl } from '@angular/forms';
import { NbControlErrTypeEnum } from '../constants';

export const fileType = (types: string[]) => {
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
