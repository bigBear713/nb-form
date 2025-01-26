# v19.0.0
## 破坏性更新
- feat: `angular`升级到`^19.0.0`;
- feat: `@bigbear713/nb-common`升级到`^19.0.0`;
  
---

# v18.0.0
## 破坏性更新
- feat: `angular`升级到`^18.0.0`;
- feat: `@bigbear713/nb-common`升级到`^18.0.0`;
  
---

# v17.0.0
## 破坏性更新
- feat: `angular`升级到`^17.0.0`;
- feat: `@bigbear713/nb-common`升级到`^17.0.0`;
  
---

# v16.0.0
## 破坏性更新
- feat: `angular`升级到`^16.0.0`;
- feat: `@bigbear713/nb-common`升级到`^16.0.0`;

## [Components](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#Components "Components")
- perf: [`<nb-control-err></nb-control-err>`](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nb-control-errnb-control-err "<nb-control-err></nb-control-err>") - 使用UnsubscribeService管理rxjs的订阅
- feat: [`<nb-control-err></nb-control-err>`](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nb-control-errnb-control-err "<nb-control-err></nb-control-err>") - `control`属性添加必填校验：[issue/17](https://github.com/bigBear713/nb-form/issues/17)；
  
---

# v15.1.0
## [Components](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#Components "Components")
- feat: [`<nb-control-err></nb-control-err>`](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nb-control-errnb-control-err) - 支持以`standalone component`的方式引入
- feat: [`<nb-field-item></nb-field-item>`](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nb-field-itemnb-field-item) - 支持以`standalone component`的方式引入

---

# v15.0.0
## 破坏性更新
- feat: `angular`升级到`^15.0.0`; 
- feat: `@bigbear713/nb-common`升级到`^15.0.0`;

## [Tokens](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#Tokens "Tokens")
- feat: 增加[NB_CONTROL_COMMON_ERR_INFO](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nb_control_common_err_info)，`NB_CONTROL_COMMON_ERR_INFO_TOKEN`标记为`deprecated`；

## [Enums](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#Enums "Enums")
- feat: [NbControlErrType](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nbcontrolerrtype)，`NbControlErrTypeEnum`标记为`deprecated`；

## [Services](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#Services "Services")
- refactor: 优化[NbFormService](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nbformservice "NbFormService")的`getValidatorsFromControlConfig()`方法;

---

# v14.0.0
## 破坏性更新
- feat: `angular`升级到`^14.0.0`;
- feat: `@bigbear713/nb-common`升级到`^14.0.0`;

---

# v13.0.0
## 破坏性更新
- feat: `angular`升级到`^13.0.0`;
- feat: `@bigbear713/nb-common`升级到`^13.0.0`;

---

# v12.1.0
## [Validators](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#Validators "Validators")
- feat: [NbFormValidators.equal](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nbformvalidatorsequal "NbFormValidators.equal") - 增加`immediately`参数，默认为`true`; 

## [Services](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#Services "Services")
- feat: [NbFormService](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nbformservice "NbFormService") - `updateEqualControlsValidities()`可以更便捷的更新两个期望相等的控件的有效性;

## [Components](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#Components "Components")
- fix: [`<nb-control-err></nb-control-err>`](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nb-control-errnb-control-err "<nb-control-err></nb-control-err>") - 控件初始时为`dirty`，组件不显示错误信息;

---

# v12.0.0
## [Module](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#Module "Module")
- feat: [NbFormModule](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nbformmodule) - 提供可用的`component`
- feat: [NbFormTestingModule](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nbformtestingmodule) - 提供单元测试环境

## [Validators](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#Validators "Validators")
- feat: [NbFormValidators.arrLength](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nbformvalidatorsarrlength) - 数组长度校验器
- feat: [NbFormValidators.equal](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nbformvalidatorsequal) - 控件值是否相等校验器
- feat: [NbFormValidators.fileSize](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nbformvalidatorsfilesize) - 文件大小校验器
- feat: [NbFormValidators.fileType](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nbformvalidatorsfiletype) - 文件类型校验器
- feat: [NbFormValidators.required](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nbformvalidatorsrequired) - 必填校验器
- feat: [NbFormValidators.whitespace](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nbformvalidatorswhitespace) - 是否允许都为空格校验器

## [Services](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#Services "Services")
- feat: [NbFormService](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nbformservice "NbFormService") - 提供常用表单功能

## [Components](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#Components "Components")
- feat: [`<nb-control-err></nb-control-err>`](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nb-control-errnb-control-err "<nb-control-err></nb-control-err>") - 显示控件错误信息
- feat: [`<nb-field-item></nb-field-item>`](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nb-field-itemnb-field-item) - 提供常见的字段布局，以及控件错误信息，常用于表单中

## [Tokens](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#Tokens "Tokens")
- feat: [NB_CONTROL_COMMON_ERR_INFO](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nb_control_common_err_info) - 通过DI设置常见的错误信息，便于在`<nb-control-err></nb-control-err>`中使用

## [Interfaces](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#Interfaces "Interfaces")
- feat: [NbAbstractControl](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nbabstractcontrol) - 抽象控件类型
- feat: [INbFormConfigs](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#inbcontrolconfig) - 表单的控件配置
- feat: [INbControlConfig](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#inbcontrolerrinfo) - 控件配置
- feat: [INbControlErrInfo](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#inbformconfigs) - 控件错误信息

## [Enums](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#Enums "Enums")
- feat: [NbControlErrType](https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.CN.md#nbcontrolerrtype) - 常用表单错误枚举
