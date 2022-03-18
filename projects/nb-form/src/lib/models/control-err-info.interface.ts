import { Observable } from "rxjs";

export interface IControlErrInfo {
  [key: string]: string | Observable<string>;
}
