import { AbstractControl } from "@angular/forms";
import { NbControlErrTypeEnum } from "../constants";

export const arrMaxLength = (maxLength: number) => {
  return (control: AbstractControl) => {
    if (Array.isArray(control.value) && control.value.length > maxLength) {
      return { [NbControlErrTypeEnum.ARR_MAX_LENGTH]: true };
    }
    return null;
  };
};