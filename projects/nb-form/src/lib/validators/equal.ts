
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isEqual } from 'lodash-es';
import { NbControlErrTypeEnum } from '../constants';

export const equal = (compared: AbstractControl) => {
    return (target: AbstractControl) => {
        return isEqual(target.value, compared.value)
            ? null
            : { [NbControlErrTypeEnum.EQUAL]: true };
    }
}
