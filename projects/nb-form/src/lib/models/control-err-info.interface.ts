import { Observable } from "rxjs";

export interface INbControlErrInfo {
  [key: string]: string | Observable<string>;
}
