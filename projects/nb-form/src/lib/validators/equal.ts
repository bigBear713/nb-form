
import { AbstractControl } from '@angular/forms';
import { isEqual } from 'lodash-es';
import { NbControlErrTypeEnum } from '../constants';

export const equal = (compared: AbstractControl, immediately: boolean = true) => {
    return (target: AbstractControl) => {
        const errors = isEqual(target.value, compared.value)
            ? null
            : { [NbControlErrTypeEnum.EQUAL]: true };

        return errors && (immediately || compared.dirty) ? errors : null
    }
}
