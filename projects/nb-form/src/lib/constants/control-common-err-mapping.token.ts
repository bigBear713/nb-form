import { InjectionToken } from "@angular/core";
import { INbControlErrInfo } from "../models";

export const NB_CONTROL_COMMON_ERR_INFO = new InjectionToken<INbControlErrInfo>('common errors information');
/**
 * @deprecated use 'NB_CONTROL_COMMON_ERR_INFO' please
 */
export const NB_CONTROL_COMMON_ERR_INFO_TOKEN = NB_CONTROL_COMMON_ERR_INFO;