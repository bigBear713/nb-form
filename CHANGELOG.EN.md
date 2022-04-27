# v12.1.0
## [Validators](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#Validators "Validators")
### [NbFormValidators.equal](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#nbformvalidatorsequal "NbFormValidators.equal")
- feat: Add `immediately` param, the default is `true`; 

## [Services](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#Services "Services")
### [NbFormService](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#nbformservice "NbFormService")
- feat: Add `updateEqualControlsValidities()` function so that you can more convenient to update the validities of the two controls which want to be equal;

## [Components](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#Components "Components")
### [`<nb-control-err></nb-control-err>`](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#nb-control-errnb-control-err "<nb-control-err></nb-control-err>")
- fix: When the control is in init status and it is dirty, the component will not display the error information;

# v12.0.0
## [Module](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#Module "Module")
- feat: [NbFormModule](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#nbformmodule) - provide some useful `component`
- feat: [NbFormTestingModule](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#nbformtestingmodule) - provide the env to unit test;

## [Validators](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#Validators "Validators")
- feat: [NbFormValidators.arrLength](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#nbformvalidatorsarrlength) - array length validator
- feat: [NbFormValidators.equal](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#nbformvalidatorsequal) - values are equal validator
- feat: [NbFormValidators.fileSize](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#nbformvalidatorsfilesize) - file size validator
- feat: [NbFormValidators.fileType](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#nbformvalidatorsfiletype) - file type validator
- feat: [NbFormValidators.required](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#nbformvalidatorsrequired) - required validator
- feat: [NbFormValidators.whitespace](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#nbformvalidatorswhitespace) - can all be whitespace validator

## [Services](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#Services "Services")
- feat: [NbFormService](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#nbformservice "NbFormService") - a `service` which provide some common function about form

## [Components](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#Components "Components")
- feat: [`<nb-control-err></nb-control-err>`](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#nb-control-errnb-control-err "<nb-control-err></nb-control-err>") - the component is used to show error info of the control
- feat: [`<nb-field-item></nb-field-item>`](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#nb-field-itemnb-field-item) - it has common layout and can show error info

## [Tokens](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#Tokens "Tokens")
- feat: [NB_CONTROL_COMMON_ERR_INFO_TOKEN](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#nb_control_common_err_info_token) - used to set common error info via DI, and the error information will be used in `<nb-control-err></nb-control-err>`

## [Interfaces](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#Interfaces "Interfaces")
- feat: [NbAbstractControl](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#nbabstractcontrol) - abstract control type
- feat: [INbFormConfigs](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#inbcontrolconfig) - form control configs
- feat: [INbControlConfig](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#inbcontrolerrinfo) - control config
- feat: [INbControlErrInfo](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#inbformconfigs) - error information of the control

## [Enums](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#Enums "Enums")
- feat: [NbControlErrTypeEnum](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md#nbcontrolerrtypeenum) - common error enum