
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isEqual } from 'lodash-es';
import { NbControlErrTypeEnum } from '../constants';

export const equal = (compare: AbstractControl) => {
    return (target: AbstractControl) => {
        const errors: ValidationErrors | null = isEqual(target.value, compare.value)
            ? null
            : { [NbControlErrTypeEnum.EQUAL]: true };

        if (errors) {
            compare.setErrors(errors);
        } else {
            compare.updateValueAndValidity();
        }
        return errors;
    }
}
