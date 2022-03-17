import { AbstractControl } from "@angular/forms";
import { NbControlErrTypeEnum } from "../constants";

export const arrLength = (arrLength: { max?: number; min?: number }) => {
  return (control: AbstractControl) => {
    const arr = control.value;
    if (!Array.isArray(arr)) {
      return null;
    }

    if (arrLength.max && control.value.length > arrLength.max) {
      return { [NbControlErrTypeEnum.ARR_MAX_LENGTH]: true };
    }

    if (arrLength.min && control.value.length < arrLength.min) {
      return { [NbControlErrTypeEnum.ARR_MIN_LENGTH]: true };
    }

    return null;
  };
};