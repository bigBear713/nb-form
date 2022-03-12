export interface INbFormConfig {
  [key: string]: INbFormControlConfig;
}

export interface INbFormControlConfig {
  required: boolean;
  max?: number;
  min?: number;
  maxLength?: number,
  minLength?: number,
  arrMaxLength?: number;
  arrMinLength?: number;
  maxFileSize?: number;
  minFileSize?: number;
  fileTypes?: string[];
  pattern?: string | RegExp;
  whitespace?: boolean;
  initValue?: any;
  placeholder?: string;
  [key: string]: any;
}