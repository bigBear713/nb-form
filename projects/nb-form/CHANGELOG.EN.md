# v12.1.0
## [Validators](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Validators "Validators")
### NbFormValidators.equal
- feat: Add `immediately` param, the default is `true`; 

<br/>

## [Services](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Services "Services")
### NbFormService
- feat: Add `updateEqualControlsValidities()` function so that you can more convenient to update the validities of the two controls which want to be equal;

<br/>

## [Components](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Components "Components")
### `<nb-control-err></nb-control-err>`
- fix: When the control is in init status and it is dirty, the component will not display the error information;

<br/>

# v12.0.0
## [Module](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Module "Module")
- feat: NbFormModule - provide some useful `component`
- feat: NbFormTestingModule - provide the env to unit test;

## [Validators](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Validators "Validators")
- feat: NbFormValidators.arrLength - array length validator
- feat: NbFormValidators.equal - values are equal validator
- feat: NbFormValidators.fileSize - file size validator
- feat: NbFormValidators.fileType - file type validator
- feat: NbFormValidators.required - required validator
- feat: NbFormValidators.whitespace - can all be whitespace validator

<br>

## [Services](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Services "Services")
- feat: NbFormService - a `service` which provide some common function about form

<br>

## [Components](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Components "Components")
- feat: `<nb-control-err></nb-control-err>` - the component is used to show error info of the control
- feat: `<nb-field-item></nb-field-item>` - it has common layout and can show error info

<br>

## [Tokens](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Tokens "Tokens")
- feat: NB_CONTROL_COMMON_ERR_INFO_TOKEN - Used to set common error info via DI, and the error information will be used in `<nb-control-err></nb-control-err>`

<br>

## [Interfaces](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Interfaces "Interfaces")
- feat: NbAbstractControl - abstract control type
- feat: INbFormConfigs - form control configs
- feat: INbControlConfig - control config
- feat: INbControlErrInfo - error information of the control

<br>

## [Enums](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Enums "Enums")
- feat: NbControlErrTypeEnum - common error enum