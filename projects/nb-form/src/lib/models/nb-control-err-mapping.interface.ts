import { Observable } from 'rxjs';

export interface INbControlErrMapping {
  [key: string]: string | Observable<string>;
}
