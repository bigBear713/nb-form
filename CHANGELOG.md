# v20.0.0
## Breaking Changes
- feat: Upgrade `angular` to `^20.0.0`;
- feat: Upgrade `@bigbear713/nb-common` to `^20.0.0`;

---

# v19.0.0
## Breaking Changes
- feat: Upgrade `angular` to `^19.0.0`;
- feat: Upgrade `@bigbear713/nb-common` to `^19.0.0`;

---

# v18.0.0
## Breaking Changes
- feat: Upgrade `angular` to `^18.0.0`;
- feat: Upgrade `@bigbear713/nb-common` to `^18.0.0`;

---

# v17.0.0
## Breaking Changes
- feat: Upgrade `angular` to `^17.0.0`;
- feat: Upgrade `@bigbear713/nb-common` to `^17.0.0`;

---

# v16.0.0
## Breaking Changes
- feat: Upgrade `angular` to `^16.0.0`;
- feat: Upgrade `@bigbear713/nb-common` to `^16.0.0`;

## [Components](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#Components "Components")
- perf: [`<nb-control-err></nb-control-err>`](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nb-control-errnb-control-err "<nb-control-err></nb-control-err>") - Using UnsubscribeService to manage rxjs subscriptions
- feat: [`<nb-control-err></nb-control-err>`](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nb-control-errnb-control-err "<nb-control-err></nb-control-err>") - The `control` is required: [issue/17](https://github.com/bigBear713/nb-form/issues/17)；

---

# v15.1.0
## [Components](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#Components "Components")
- feat: [`<nb-control-err></nb-control-err>`](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nb-control-errnb-control-err) - Support to be imported as a `standalone component`
- feat: [`<nb-field-item></nb-field-item>`](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nb-field-itemnb-field-item) - Support to be imported as a `standalone component`

---

# v15.0.0
## Breaking Changes
- feat: Upgrade `angular` to `^15.0.0`;
- feat: Upgrade `@bigbear713/nb-common` to `^15.0.0`;

## [Tokens](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#Tokens "Tokens")
- feat: Add [NB_CONTROL_COMMON_ERR_INFO](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nb_control_common_err_info), mark `NB_CONTROL_COMMON_ERR_INFO_TOKEN` as `deprecated`;

## [Enums](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#Enums "Enums")
- feat: Add [NbControlErrType](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nbcontrolerrtype), mark `NbControlErrTypeEnum` as `deprecated`;

## [Services](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#Services "Services")
- refactor: optimize the function `getValidatorsFromControlConfig()` of [NbFormService](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nbformservice "NbFormService");

---

# v14.0.0
## Breaking Changes
- feat: Upgrade `angular` to `^14.0.0`;
- feat: Upgrade `@bigbear713/nb-common` to `^14.0.0`;

---

# v13.0.0
## Breaking Changes
- feat: Upgrade `angular` to `^13.0.0`;
- feat: Upgrade `@bigbear713/nb-common` to `^13.0.0`;

---

# v12.1.0
## [Validators](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#Validators "Validators")
- feat: [NbFormValidators.equal](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nbformvalidatorsequal "NbFormValidators.equal") - Add `immediately` param, the default is `true`; 

## [Services](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#Services "Services")
- feat: [NbFormService](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nbformservice "NbFormService") - Add `updateEqualControlsValidities()` function so that you can more convenient to update the validities of the two controls which want to be equal;

## [Components](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#Components "Components")
- fix: [`<nb-control-err></nb-control-err>`](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nb-control-errnb-control-err "<nb-control-err></nb-control-err>") - When the control is in init status and it is dirty, the component will not display the error information;

---

# v12.0.0
## [Module](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#Module "Module")
- feat: [NbFormModule](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nbformmodule) - provide some useful `component`
- feat: [NbFormTestingModule](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nbformtestingmodule) - provide the env to unit test;

## [Validators](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#Validators "Validators")
- feat: [NbFormValidators.arrLength](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nbformvalidatorsarrlength) - array length validator
- feat: [NbFormValidators.equal](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nbformvalidatorsequal) - values are equal validator
- feat: [NbFormValidators.fileSize](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nbformvalidatorsfilesize) - file size validator
- feat: [NbFormValidators.fileType](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nbformvalidatorsfiletype) - file type validator
- feat: [NbFormValidators.required](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nbformvalidatorsrequired) - required validator
- feat: [NbFormValidators.whitespace](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nbformvalidatorswhitespace) - can all be whitespace validator

## [Services](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#Services "Services")
- feat: [NbFormService](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nbformservice "NbFormService") - a `service` which provide some common function about form

## [Components](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#Components "Components")
- feat: [`<nb-control-err></nb-control-err>`](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nb-control-errnb-control-err "<nb-control-err></nb-control-err>") - the component is used to show error info of the control
- feat: [`<nb-field-item></nb-field-item>`](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nb-field-itemnb-field-item) - it has common layout and can show error info

## [Tokens](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#Tokens "Tokens")
- feat: [NB_CONTROL_COMMON_ERR_INFO](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nb_control_common_err_info) - used to set common error info via DI, and the error information will be used in `<nb-control-err></nb-control-err>`

## [Interfaces](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#Interfaces "Interfaces")
- feat: [NbAbstractControl](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nbabstractcontrol) - abstract control type
- feat: [INbFormConfigs](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#inbcontrolconfig) - form control configs
- feat: [INbControlConfig](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#inbcontrolerrinfo) - control config
- feat: [INbControlErrInfo](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#inbformconfigs) - error information of the control

## [Enums](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#Enums "Enums")
- feat: [NbControlErrType](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md#nbcontrolerrtype) - common error enum
