import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export const required = (required: boolean = true): ValidatorFn => {
  return (control: AbstractControl) => {
    return required ? Validators.required(control) : null;
  };
};
