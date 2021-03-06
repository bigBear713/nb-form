# v13.0.0
## 破坏性更新
- feat: `angular`升级到`v13`;

<br/>

# v12.1.0
## [Validators](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Validators "Validators")
### [NbFormValidators.equal](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#nbformvalidatorsequal "NbFormValidators.equal")
- feat: 增加`immediately`参数，默认为`true`; 

## [Services](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Services "Services")
### [NbFormService](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#nbformservice "NbFormService")
- feat: `updateEqualControlsValidities()`可以更便捷的更新两个期望相等的控件的有效性;

## [Components](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Components "Components")
### [`<nb-control-err></nb-control-err>`](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#nb-control-errnb-control-err "<nb-control-err></nb-control-err>")
- fix: 控件初始时为`dirty`，组件不显示错误信息;

# v12.0.0
## [Module](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Module "Module")
- feat: [NbFormModule](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#nbformmodule) - 提供可用的`component`
- feat: [NbFormTestingModule](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#nbformtestingmodule) - 提供单元测试环境

## [Validators](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Validators "Validators")
- feat: [NbFormValidators.arrLength](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#nbformvalidatorsarrlength) - 数组长度校验器
- feat: [NbFormValidators.equal](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#nbformvalidatorsequal) - 控件值是否相等校验器
- feat: [NbFormValidators.fileSize](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#nbformvalidatorsfilesize) - 文件大小校验器
- feat: [NbFormValidators.fileType](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#nbformvalidatorsfiletype) - 文件类型校验器
- feat: [NbFormValidators.required](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#nbformvalidatorsrequired) - 必填校验器
- feat: [NbFormValidators.whitespace](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#nbformvalidatorswhitespace) - 是否允许都为空格校验器

## [Services](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Services "Services")
- feat: [NbFormService](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#nbformservice "NbFormService") - 提供常用表单功能

## [Components](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Components "Components")
- feat: [`<nb-control-err></nb-control-err>`](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#nb-control-errnb-control-err "<nb-control-err></nb-control-err>") - 显示控件错误信息
- feat: [`<nb-field-item></nb-field-item>`](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#nb-field-itemnb-field-item) - 提供常见的字段布局，以及控件错误信息，常用于表单中

## [Tokens](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Tokens "Tokens")
- feat: [NB_CONTROL_COMMON_ERR_INFO_TOKEN](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#nb_control_common_err_info_token) - 通过DI设置常见的错误信息，便于在`<nb-control-err></nb-control-err>`中使用

## [Interfaces](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Interfaces "Interfaces")
- feat: [NbAbstractControl](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#nbabstractcontrol) - 抽象控件类型
- feat: [INbFormConfigs](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#inbcontrolconfig) - 表单的控件配置
- feat: [INbControlConfig](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#inbcontrolerrinfo) - 控件配置
- feat: [INbControlErrInfo](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#inbformconfigs) - 控件错误信息

## [Enums](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#Enums "Enums")
- feat: [NbControlErrTypeEnum](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md#nbcontrolerrtypeenum) - 常用表单错误枚举