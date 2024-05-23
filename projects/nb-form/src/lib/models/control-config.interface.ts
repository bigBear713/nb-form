export interface INbControlConfig {
  required?: boolean;
  max?: number;
  min?: number;
  maxLength?: number;
  minLength?: number;
  arrMaxLength?: number;
  arrMinLength?: number;
  maxFileSize?: number;
  minFileSize?: number;
  fileType?: string[];
  pattern?: string | RegExp;
  whitespace?: boolean;
  initValue?: unknown;
  placeholder?: string;
  [key: string]: unknown;
}
