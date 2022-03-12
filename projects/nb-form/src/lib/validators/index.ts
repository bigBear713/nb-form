import { arrMaxLength } from './arr-max-length';
import { arrMinLength } from './arr-min-length';
import { fileSize } from './file-size';
import { fileType } from './file-type';
import { repeated } from './repeated';
import { required } from './required';
import { whitespace } from './whitespace';

export const NbFormValidators = {
  fileSize,
  fileType,
  required,
  whitespace,
  repeated,
  arrMaxLength,
  arrMinLength,
};
