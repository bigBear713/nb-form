import { Validators } from "@angular/forms";
import { INbControlConfig } from "../models";
import { NbFormValidators } from "../validators";

export const formValidatorStrategies = {
    required: (config: INbControlConfig) => NbFormValidators.required(config.required),
    max: (config: INbControlConfig) => {
        if (config.max ?? false) {
            return Validators.max(config.max as number);
        }
        return;
    },
    min: (config: INbControlConfig) => {
        if (config.min ?? false) {
            return Validators.min(config.min as number);
        }
        return;
    },
    maxLength: (config: INbControlConfig) => {
        if (config.maxLength ?? false) {
            return Validators.maxLength(config.maxLength as number);
        }
        return;
    },
    minLength: (config: INbControlConfig) => {
        if (config.minLength ?? false) {
            return Validators.minLength(config.minLength as number);
        }
        return;
    },
    arrMaxLength: (config: INbControlConfig) => {
        if (config.arrMaxLength ?? false) {
            return NbFormValidators.arrLength({ max: config.arrMaxLength as number });
        }
        return;
    },
    arrMinLength: (config: INbControlConfig) => {
        if (config.arrMinLength ?? false) {
            return NbFormValidators.arrLength({ min: config.arrMinLength as number });
        }
        return;
    },
    maxFileSize: (config: INbControlConfig) => {
        if (config.maxFileSize ?? false) {
            return NbFormValidators.fileSize({ max: config.maxFileSize });
        }
        return;
    },
    minFileSize: (config: INbControlConfig) => {
        if (config.minFileSize ?? false) {
            return NbFormValidators.fileSize({ min: config.minFileSize })
        }
        return;
    },
    fileType: (config: INbControlConfig) => {
        if (config.fileType?.length) {
            return NbFormValidators.fileType(config.fileType);
        }
        return;
    },
    pattern: (config: INbControlConfig) => {
        if (config.pattern) {
            return Validators.pattern(config.pattern);
        }
        return;
    },
    whitespace: (config: INbControlConfig) => NbFormValidators.whitespace(config.whitespace),
};