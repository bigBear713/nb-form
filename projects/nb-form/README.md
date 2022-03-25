<div align="center">

### @bigbear713/nb-form

Angular common form lib by bigBear713.

[OnlineDemo](https://bigBear713.github.io/nb-form/)

[Bug Report](https://github.com/bigBear713/nb-form/issues)

[Feature Request](https://github.com/bigBear713/nb-form/issues)

</div>

## Document
- [中文](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md "中文文档")
- [English](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md "English Document")

<br>


## Feature
- 提供常用的表单控件校验器：`arrLength`, `fileSize`, `fileType`, `repeated`, `required`, `whitespace`。具体见下方校验器的定义;
- 支持通过DI设置common error info;
- 支持组件的更新策略为`ChangeDetectionStrategy.OnPush`;

<br>


### Version
###### nb-form的大版本和Angular的大版本保持对应关系
- "@bigbear713/nb-form":"^12.0.0" - "@angular/core": "^12.0.0"

<br>

### Installation
```bash
$ npm i @bigbear713/nb-form
// or
$ yarn add @bigbear713/nb-form
```

<br>

### Module

#### NbFormModule
###### 表单模块。引入该模块后，可使用`component`。`service`和`validators`不需要引入该模块也可使用。

#### NbFormTestingModule
###### 表单测试模块。用于Unit Test。

<br>

### Validators

#### NbFormValidators.arrMaxLength
##### `v12.0.0`
###### 数组长度校验器

##### Params
| Name  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| arrLength  | `{ max?: number; min?: number }`  | true  | 数组长度限制。可单独设置最大或者最小长度。  | `v12.0.0` |

##### Return
| Type  | Description  |
| ------------ | ------------ |
| `{ [NbControlErrTypeEnum.ARR_MAX_LENGTH]?: true;[NbControlErrTypeEnum.ARR_MIN_LENGTH]?: true; }｜null`  | 返回null表示符合条件，或者要校验的内容不是一个数组。返回`{ [NbControlErrTypeEnum.ARR_MAX_LENGTH]: true }`表示数组长度超出最大长度限制。返回`{ [NbControlErrTypeEnum.ARR_MIN_LENGTH]: true }`表示数组长度小于最小长度限制。  |

##### Usage
```ts
const maxControl = new FormArray([1,2,3,4,5,6],[NbFormValidators.arrMaxLength({max:5,min:3})]);
console.log(maxControl.errors); // { [NbControlErrTypeEnum.ARR_MAX_LENGTH]: true }

const minControl = new FormArray([1,2],[NbFormValidators.arrMaxLength({max:5,min:3})]);
console.log(minControl.errors); // { [NbControlErrTypeEnum.ARR_MIN_LENGTH]: true }
```

<br>

#### NbFormValidators.equal
##### `v12.0.0`
###### 值是否相等校验器。当两个控件的值不相等时，当前控件会带有相关的错误信息。如果想两个控件都带有错误信息，可参考demo

##### Params
| Name  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| compared  | `AbstractControl`  | true  | 要对比的表单控件. | `v12.0.0` |
| immediately  | `boolean`  | false  | 是否立即校验。如果设置为`false`，则会在compared控件为`dirty`状态时才会校验。默认为`true` | `v12.1.0` |

##### Return
| Type  | Description  |
| ------------ | ------------ |
| `{ [NbControlErrTypeEnum.NOT_EQUAL]: true; }｜null`  | 校验结果。返回null表示两个表单控件的值相等。返回`{ [NbControlErrTypeEnum.NOT_EQUAL]: true }`表示两个表单控件值不相等。 |

##### Usage
```ts
const targetControl = new FormControl('');
const compareControl = new FormControl(null);
targetControl.setValidators([NbFormValidators.equal(compareControl)]);
console.log(targetControl.errors); // { [NbControlErrTypeEnum.NOT_EQUAL]: true; }


const targetControl = new FormControl('');
const compareControl = new FormControl(null);
targetControl.setValidators([NbFormValidators.equal(compareControl,false)]);
console.log(targetControl.errors); // null

compareControl.markAsDirty();
targetControl.updateValueAndValidity();
console.log(targetControl.errors); // { [NbControlErrTypeEnum.NOT_EQUAL]: true; }
```

<br>

#### NbFormValidators.fileSize
##### `v12.0.0`
###### 文件大小校验器

##### Params
| Name  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| fileSize  | `{ max?: number; min?: number }`  | true  | 文件大小限制。可单独设置最大值或者最小值。最大最小值的单位是`B`. | `v12.0.0` |

##### Return
| Type  | Description  |
| ------------ | ------------ |
| `{ [NbControlErrTypeEnum.FILE_MAX_SIZE]?: true;[NbControlErrTypeEnum.FILE_MIN_SIZE]?: true; }｜null`  | 校验结果。返回null表示符合条件，或者要校验的内容不是一个`File`类型。返回`{ [NbControlErrTypeEnum.FILE_MAX_SIZE]: true }`表示文件大小超出最大值限制。返回`{ [NbControlErrTypeEnum.FILE_MIN_SIZE]: true }`表示文件大小小于最小值限制。 |

##### Usage
```ts
const control = new FormControl(new File(),[NbFormValidators.fileSize({max:5,min:3})]);
console.log(control.errors); // { [NbControlErrTypeEnum.FILE_MAX_SIZE]: true; } / { [NbControlErrTypeEnum.FILE_MIN_SIZE]?: true; }
```

<br>

#### NbFormValidators.fileType
##### `v12.0.0`
###### 文件类型校验器

##### Params
| Name  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| types  | `string[]`  | true  | 要支持的文件类型，值应该为`MIME Type`. | `v12.0.0` |

##### Return
| Type  | Description  |
| ------------ | ------------ |
| `{ [NbControlErrTypeEnum.FILE_TYPE]: true; }｜null`  | 校验结果。返回null表示符合条件，或者要校验的内容不是一个`File`类型。返回`{ [NbControlErrTypeEnum.FILE_TYPE]: true }`表示文件类型不在要支持的类型中。 |

##### Usage
```ts
const control = new FormControl(new File(),[NbFormValidators.fileType(['image/jpeg','image/png'])]);
console.log(control.errors); // { [NbControlErrTypeEnum.FILE_TYPE]: true; }
```

<br>

#### NbFormValidators.required
##### `v12.0.0`
###### 必填校验器

##### Params
| Name  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| required  | `boolean`  | false  | 表单控件是否必填。默认为`true`. 如果为`true`,则会调用`Validators.required`, 否则不会对表单控件内容做必填校验 | `v12.0.0` |

##### Return
| Type  | Description  |
| ------------ | ------------ |
| `{ [NbControlErrTypeEnum.REQUIRED]: true; }｜null`  | 校验结果。返回null表示符合条件。返回`{ [NbControlErrTypeEnum.REQUIRED]: true }`表示表单控件不符合必填校验 |

##### Usage
```ts
const control = new FormControl('',[NbFormValidators.required(true)])
console.log(control.errors); // { [NbControlErrTypeEnum.REQUIRED]: true; }
```

<br>

#### NbFormValidators.whitespace
##### `v12.0.0`
###### 空格校验器

##### Params
| Name  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| canWhitespace  | `boolean`  | false  | 表单控件可以都是空格内容。默认为`true`. 如果为`true`, 则允许控件值都是空格. | `v12.0.0` |

##### Return
| Type  | Description  |
| ------------ | ------------ |
| `{ [NbControlErrTypeEnum.WHITESPACE]: true; }｜null`  | 校验结果。返回null表示符合条件。返回`{ [NbControlErrTypeEnum.WHITESPACE]: true }`表示不允许都是空格的情况下，表单控件值都是空格 |

##### Usage
```ts
const control =new FormControl('    ',[NbFormValidators.whitespace(false)])
console.log(control.errors); // { [NbControlErrTypeEnum.WHITESPACE]: true; }
```

<br>

### Service

#### NbFormService
##### `v12.0.0`
###### 提供常用表单功能的`service`

##### Methods
| Name  | Return  | Description  | Scenes  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| getValidatorsFromControlConfig(config: INbControlConfig)  | `ValidatorFn[]`  | 根据配置信息，获取校验器数组。可配置的条件有：`required`,`max`,`min`,`maxLength`,`minLength`,`arrMaxLength`,`arrMinLength`,`maxFileSize`,`minFileSize`,`fileType`,`pattern`,`whitespace`。其中`max`,`min`,`maxLength`,`minLength`,`pattern`等返回的是`Validators`提供的校验器。剩下的则为`NbFormValidators`提供的校验器 | 需要根据配置信息快速设置校验器数组时  | `v12.0.0` |
| markAllAsDirty(control: NbAbstractControl, opts?: { onlySelf?: boolean; emitEvent?: boolean; }) | `void`  | 将表单控件以及子控件都标记为dirty。`control`为要标记的控件，`opts`会在标记时，传给控件以及每个子控件 | 适合想将一个控件以及自控件都标记为dirty的场景  | `v12.0.0` |
| showAllErrInfo(control: NbAbstractControl, opts?: { onlySelf?: boolean; emitEvent?: boolean; })  | `void`  | 展示控件以及子控件的所有错误信息。通过调用`control.markAllAsTouched`,`markAllAsDirty`,`updateAllValueAndValidity`等常用方法，让错误信息在UI上展示出来。`control`为要操作的控件，`opts`会在调用`markAllAsDirty`,`updateAllValueAndValidity`时，传给控件以及每个子控件  | 适合想将控件以及子控件的错误信息都展示给用户的场景，比如表单提交时。 | `v12.0.0` |
| updateAllValueAndValidity(control: NbAbstractControl, opts?: { onlySelf?: boolean; emitEvent?: boolean; }) | `void`  | 将表单控件以及子控件都更新值和值的有效性。`control`为要操作的控件，`opts`会在操作时，传给控件以及每个子控件 | 适合想让控件和子控件都更新值和值的有效性的场景 | `v12.0.0` |
| updateEqualControlsValidities(controls: { target: AbstractControl; compared: AbstractControl }, destroy$?: Subject<any>) | `Subscription`  | 更新两个想相等的控件的有效性。只有当前后两次某个控件的状态改变时才会触发。这是一个订阅事件，返回值为订阅事件的索引。可通过它来取消事件的订阅。或者传入一个`destroy$`参数，在需要的时候通过`destroy$`发送值来取消订阅 | 适合结合`NbFormValidators.equal`校验器，及时更新两个控件是否相等的状态，比如更改密码时的新密码和重复密码的验证 | `v12.1.0` |


##### Usage
```ts
constructor(private formService: NbFormService) {}

const config:INbControlConfig={required:true,whitespace:false};
const validators = this.formService.getValidatorsFromControlConfig(config);
new FormControl('',validators);


const form = new FormGroup({
  // ...
});
this.markAllAsDirty(form,{onlySelf:true});


const form = new FormGroup({
  // ...
});
this.showAllErrInfo(form,{onlySelf:true});


const form = new FormGroup({
  // ...
});
this.updateAllValueAndValidity(form,{onlySelf:true});

const passwordControl = new FormControl();
const repeatPasswordControl = new FormControl();
passwordControl.setValidators([NbFormValidators.equal(repeatPasswordControl,false)]);
repeatPasswordControl.setValidators([NbFormValidators.equal(passwordControl,false)]);
const controls = {target:passwordControl,compared:repeatPasswordControl};
// 通过返回值取消订阅
const subscription = this.updateEqualControlsValidities(controls);
subscription.unsubscribe();
// 通过destroy$取消订阅
const destroy$ = new Subject<void>();
const subscription = this.updateEqualControlsValidities(controls,destroy$);
destroy$.next();
destroy$.complete();
```

<br>


### Component

#### `<nb-control-err></nb-control-err>`
##### `v12.0.0`
###### 显示控件控件信息时使用的组件。错误信息支持`string`和`Observable<string>`, 以便适合多语言场景。可在`providers`中设置常用的错误信息，和单独传入该组件的错误信息将合并成最终使用的错误信息

##### Input
| Name  | Type  | Default  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| control  | `AbstractControl`  | `-`  | 要显示的错误信息所属的控件  | `v12.0.0` |
| errInfo  | `INbControlErrInfo`  | `{}`  | 当前控件的错误信息，会和`providers`中设置常用的错误信息一起组合成最终使用的错误信息。如果不传，则只会显示`providers`中设置常用的错误信息  | `v12.0.0` |

##### Usage
```html
<!-- control = new FormControl() -->
<!-- errInfo = {required:'这个字段必填！'} -->
<nb-control-err [control]="control" [errInfo]="errInfo"></nb-control-err>
```

<br>

#### `<nb-field-item></nb-field-item>`
##### `v12.0.0`
###### 字段项组件，常用于表单中。提供基本的字段布局，以及错误信息的展示
##### `[field-label]`
###### 字段标签

##### Input
| Name  | Type  | Default  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| control  | `AbstractControl ｜ undefined`  | `-`  | 要显示错误信息的控件。 | `v12.0.0` |
| errInfo  | `INbControlErrInfo`  | `{}` | 要显示的错误信息。如果不传，则只会显示`providers`中设置常用的错误信息 | `v12.0.0` |
| required  | `boolean`  | `false` | 该字段是否必填。如果必填，字段标签左侧会出现一个"*"。默认为false | `v12.0.0` |

##### Usage
```html
<!-- 设置字段标签和字段内容，非必填，不显示错误信息 -->
<nb-field-item>
  <ng-container field-label>field 1</ng-container>
  <input>
</nb-field-item>

<!-- 必填，显示错误信息 -->
<nb-field-item [required]="true" [control]="control" [errInfo]="errInfo">
  <ng-container field-label>field 2</ng-container>
  <input>
</nb-field-item>

```

<br>


### Token

#### NB_CONTROL_COMMON_ERR_INFO_TOKEN
##### `v12.0.0`
###### 用于设置常见的错误信息，避免每个地方都需要设置一遍。设置后，会和每个`<nb-control-err></nb-control-err>`组件中传入的错误信息组合成最终的错误信息。

##### Usage
```ts
  providers: [
    // ...
    {
      provide: NB_CONTROL_COMMON_ERR_INFO_TOKEN,
      useFactory: (transService: NbTransService) => ({
        [NbControlErrTypeEnum.FILE_TYPE]: transService.translationAsync('fileType'),
        [NbControlErrTypeEnum.FILE_MIN_SIZE]: 'The file min file is 50KB!',
      }),
      deps: [NbTransService]
    },
    // ...
  ]
```

<br>

### Interface

#### NbAbstractControl
##### `v12.0.0`
###### 抽象控件类型，包含`AbstractControl`, `null`, `undefined` 等3种类型

<br>

#### INbControlConfig
##### `v12.0.0`
###### 控件配置
| Property  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| required  | `boolean`  | false  | 是否必填 | `v12.0.0` |
| max  | `number`  | false  | 最大值 | `v12.0.0` |
| min  | `number`  | false  | 最小值 | `v12.0.0` |
| maxLength  | `number`  | false  | 最大长度 | `v12.0.0` |
| minLength  | `number`  | false  | 最小长度 | `v12.0.0` |
| arrMaxLength  | `number`  | false  | 数组最大长度 | `v12.0.0` |
| arrMinLength  | `number`  | false  | 数组最小长度 | `v12.0.0` |
| maxFileSize  | `number`  | false  | 最大文件大小 | `v12.0.0` |
| minFileSize  | `number`  | false  | 最小文件大小 | `v12.0.0` |
| fileType  | `string[]`  | false  | 支持的文件类型 | `v12.0.0` |
| pattern  | `string ｜ RegExp`  | false  | 正则表达匹配 | `v12.0.0` |
| whitespace  | `boolean`  | false  | 是否可以都是空格 | `v12.0.0` |
| initValue  | `any`  | false  | 初始值 | `v12.0.0` |
| placeholder  | `string`  | false  | placeholder | `v12.0.0` |
| [key: string]  | `any`  | false  | 拓展配置 | `v12.0.0` |

<br>

#### INbControlErrInfo
##### `v12.0.0`
###### 控件错误信息
| Property  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| [key: string]  | `string｜Observable<string>`  | false  | key值为字符串类型，value值为字符串类型或者可观察者对象。key表示错误类型，value为显示到UI上的错误信息。支持直接显示和订阅显示，以便在多语言场景下使用 | `v12.0.0` |

<br>

#### INbFormConfigs
##### `v12.0.0`
###### 表单的控件配置
| Property  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| [key: string]  | `INbControlConfig`  | false  | key值为表单的控件的名称，value为控件的配置信息 | `v12.0.0` |

<br>

### Enum
#### NbControlErrTypeEnum
##### `v12.0.0`
###### 常用表单错误枚举
| Key  | Value  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ |  
| REQUIRED  | `required`  | 必填错误 | `v12.0.0` |
| FILE_MAX_SIZE  | `fileMaxSize`  | 最大文件大小错误 | `v12.0.0` |
| FILE_MIN_SIZE  | `fileMinSize`  | 最小文件大小错误 | `v12.0.0` |
| FILE_TYPE  | `fileType`  | 文件类型 | `v12.0.0` |
| EQUAL  | `equal`  | 相等错误 | `v12.0.0` |
| MAX_LENGTH  | `maxlength`  | 最大长度错误 | `v12.0.0` |
| MIN_LENGTH  | `minlength`  | 最小长度错误 | `v12.0.0` |
| ARR_MAX_LENGTH  | `arrMaxLength`  | 数组最大长度错误 | `v12.0.0` |
| ARR_MIN_LENGTH  | `arrMinLength`  | 数组最小长度错误 | `v12.0.0` |
| WHITESPACE  | `whitespace`  | 空格错误 | `v12.0.0` |

<br>

### 贡献
> 欢迎提feature和PR，一起使该项目更好

<a href="https://github.com/bigBear713" target="_blank"><img src="https://avatars.githubusercontent.com/u/12368900?v=4" alt="bigBear713" width="30px" height="30px"></a>

<br>

### License
MIT