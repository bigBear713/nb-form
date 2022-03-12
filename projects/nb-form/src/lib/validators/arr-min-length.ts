import { AbstractControl } from "@angular/forms";
import { NbControlErrTypeEnum } from "../constants";

export const arrMinLength = (minLength: number) => {
  return (control: AbstractControl) => {
    if (Array.isArray(control.value) && control.value.length < minLength) {
      return { [NbControlErrTypeEnum.ARR_MIN_LENGTH]: true };
    }
    return null;
  };
};