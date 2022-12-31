export enum NbControlErrType {
  REQUIRED = 'required',
  FILE_MAX_SIZE = 'fileMaxSize',
  FILE_MIN_SIZE = 'fileMinSize',
  FILE_TYPE = 'fileType',
  EQUAL = 'equal',
  MAX_LENGTH = 'maxlength',
  MIN_LENGTH = 'minlength',
  ARR_MAX_LENGTH = 'arrMaxLength',
  ARR_MIN_LENGTH = 'arrMinLength',
  WHITESPACE = 'whitespace',
}

/**
 * @deprecated use 'NbControlErrType' please
 */
export const NbControlErrTypeEnum = NbControlErrType;