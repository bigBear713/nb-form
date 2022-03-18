import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { IControlErrInfo } from '../models';

@Pipe({
  name: 'nbErrInfo'
})
export class NbErrInfoPipe implements PipeTransform {

  transform(errors: ValidationErrors | null | undefined, errInfo?: IControlErrInfo): string | Observable<string> {
    const errorKey = Object.keys(errors || {})[0];
    if (!errorKey) {
      return '';
    }
    return errInfo?.[errorKey] || '';
  }

}