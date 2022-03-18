
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isEqual } from 'lodash-es';
import { NbControlErrTypeEnum } from '../constants';

export const equal = (compared: AbstractControl) => {
    return (target: AbstractControl) => {
        const errors: ValidationErrors | null = isEqual(target.value, compared.value)
            ? null
            : { [NbControlErrTypeEnum.EQUAL]: true };

        if (errors) {
            compared.setErrors(errors);
        } else {
            compared.updateValueAndValidity();
        }
        return errors;
    }
}
