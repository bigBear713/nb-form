import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { INbControlErrInfo } from '../models';

type ErrorsInfo = ValidationErrors | null | undefined;

@Pipe({
  name: 'nbErrInfo'
})
export class NbErrInfoPipe implements PipeTransform {

  transform(errors: ErrorsInfo, errInfo?: INbControlErrInfo): string | Observable<string> {
    const errorKey = Object.keys(errors || {})[0];
    if (!errorKey) {
      return '';
    }
    return errInfo?.[errorKey] || '';
  }

}