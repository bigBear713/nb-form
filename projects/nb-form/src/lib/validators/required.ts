import { AbstractControl, Validators } from '@angular/forms';

export const required = (required: boolean = true) => {
  return (control: AbstractControl) => {
    return required ? Validators.required(control) : null;
  };
};
