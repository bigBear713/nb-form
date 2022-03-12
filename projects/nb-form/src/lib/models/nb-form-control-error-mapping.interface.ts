import { Observable } from 'rxjs';

export interface INbFormControlErrorMapping {
  [key: string]: string | Observable<string>;
}
