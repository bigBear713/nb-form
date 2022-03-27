# v12.1.0
## [Validators](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Validators "Validators")
### [NbFormValidators.equal](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#nbformvalidatorsequal "NbFormValidators.equal")
- feat: 增加`immediately`参数，默认为`true`; 

<br/>

## [Services](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Services "Services")
### [NbFormService](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#nbformservice "NbFormService")
- feat: `updateEqualControlsValidities()`可以更便捷的更新两个期望相等的控件的有效性;

<br/>

## [Components](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Components "Components")
### [`<nb-control-err></nb-control-err>`](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#nb-control-errnb-control-err "<nb-control-err></nb-control-err>")
- fix: 控件初始时为`dirty`，组件不显示错误信息;

<br/>

# v12.0.0
## [Module](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Module "Module")
- feat: NbFormModule - 提供可用的`component`
- feat: NbFormTestingModule - 提供单元测试环境

<br>

## [Validators](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Validators "Validators")
- feat: NbFormValidators.arrLength - 数组长度校验器
- feat: NbFormValidators.equal - 控件值是否相等校验器
- feat: NbFormValidators.fileSize - 文件大小校验器
- feat: NbFormValidators.fileType - 文件类型校验器
- feat: NbFormValidators.required - 必填校验器
- feat: NbFormValidators.whitespace - 是否允许都为空格校验器

<br>

## [Services](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Services "Services")
- feat: NbFormService - 提供常用表单功能

<br>

## [Components](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Components "Components")
- feat: `<nb-control-err></nb-control-err>` - 显示控件错误信息
- feat: `<nb-field-item></nb-field-item>` - 提供常见的字段布局，以及控件错误信息，常用于表单中

<br>

## [Tokens](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Tokens "Tokens")
- feat: NB_CONTROL_COMMON_ERR_INFO_TOKEN - 通过DI设置常见的错误信息，便于在`<nb-control-err></nb-control-err>`中使用

<br>

## [Interfaces](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Interfaces "Interfaces")
- feat: NbAbstractControl - 抽象控件类型
- feat: INbFormConfigs - 表单的控件配置
- feat: INbControlConfig - 控件配置
- feat: INbControlErrInfo - 控件错误信息

<br>

## [Enums](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Enums "Enums")
- feat: NbControlErrTypeEnum - 常用表单错误枚举