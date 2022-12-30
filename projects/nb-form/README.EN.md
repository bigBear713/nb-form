<div align="center">

# @bigbear713/nb-form

Angular common form lib by bigBear713.

[OnlineDemo](https://bigBear713.github.io/nb-form/)

[Bug Report](https://github.com/bigBear713/nb-form/issues)

[Feature Request](https://github.com/bigBear713/nb-form/issues)

</div>

## Document
- [中文](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.md "文档 - 中文")
- [English](https://github.com/bigBear713/nb-form/blob/master/projects/nb-form/README.EN.md "Document - English")

<br>

## Changelog
- [中文](https://github.com/bigBear713/nb-form/blob/master/CHANGELOG.md "更新日志 - 中文")
- [English](https://github.com/bigBear713/nb-form/blob/master/CHANGELOG.EN.md "Changelog - English")

<br>

## Feature
- Provide the common validators: `arrLength`, `equal`, `fileSize`, `fileType`, `required`, `whitespace`. You can see the definition below;
- Support to use DI to set common error info;
- Support the changeDetection of components as `ChangeDetectionStrategy.OnPush`;

<br>

## Version
###### The nb-form's major version will keep up with the Angular's major version
- "@bigbear713/nb-form":"^12.0.0" - "@angular/core": "^12.0.0"
- "@bigbear713/nb-form":"^13.0.0" - "@angular/core": "^13.0.0"
- "@bigbear713/nb-form":"^14.0.0" - "@angular/core": "^14.0.0"
- "@bigbear713/nb-trans":"^15.0.0" - "@angular/core": "^15.0.0"

<br>

## Installation
```bash
$ npm i @bigbear713/nb-form
// or
$ yarn add @bigbear713/nb-form
```

<br>

### Module

#### NbFormModule
###### Form module. After importing the module, you can use the `component`. The `service` and `validators` also can be used if you don't import  the module.

#### NbFormTestingModule
###### Form testing module, used fo unit test.

<br>

### Validators

#### NbFormValidators.arrLength
##### `v12.0.0`
###### Array length validator

##### Params
| Name  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| arrLength  | `{ max?: number; min?: number }`  | true  | The limit about array length. You can set max/min value alone  | `v12.0.0` |

##### Return
| Type  | Description  |
| ------------ | ------------ |
| `{ [NbControlErrType.ARR_MAX_LENGTH]?: true;[NbControlErrType.ARR_MIN_LENGTH]?: true; }｜null`  | The result. If it is null, the condition is met or the value of control is not a array value. If the result is `{ [NbControlErrType.ARR_MAX_LENGTH]: true }`, the control array value's length is greater than max limit value. If the result is `{ [NbControlErrType.ARR_MIN_LENGTH]: true }`, the control array value's length is less than the min limit value. |

##### Usage
```ts
const maxControl = new FormArray([1,2,3,4,5,6],[NbFormValidators.arrLength({max:5,min:3})]);
console.log(maxControl.errors); // { [NbControlErrType.ARR_MAX_LENGTH]: true }

const minControl = new FormArray([1,2],[NbFormValidators.arrLength({max:5,min:3})]);
console.log(minC  ontrol.errors); // { [NbControlErrType.ARR_MIN_LENGTH]: true }
```

<br>

#### NbFormValidators.equal
##### `v12.0.0`
###### Values are equal validator. When the values of the controls are not equal, only the target control will have the no equal error info. If you want to make the target and compared control all have the error info, can refer to the demo

##### Params
| Name  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| compared  | `AbstractControl`  | true  | The control which will be compared with the current control | `v12.0.0` |
| immediately  | `boolean`  | false  | Verify immediately. If set it as `false`, it will verify the value until the compared control is `dirty`. The default is `true` | `v12.1.0` |

##### Return
| Type  | Description  |
| ------------ | ------------ |
| `{ [NbControlErrType.NOT_EQUAL]: true; }｜null`  | The result. If the two control's values are equal, the result is null. If the valus are not equal, the result is `{ [NbControlErrType.NOT_EQUAL]: true }`. When the values are not equal, the compared control will has the no equal error info. |

##### Usage
```ts
const targetControl = new FormControl('');
const compareControl = new FormControl(null);
targetControl.setValidators([NbFormValidators.equal(compareControl)]);
console.log(targetControl.errors); // { [NbControlErrType.NOT_EQUAL]: true; }


const targetControl = new FormControl('');
const compareControl = new FormControl(null);
targetControl.setValidators([NbFormValidators.equal(compareControl,false)]);
console.log(targetControl.errors); // null

compareControl.markAsDirty();
targetControl.updateValueAndValidity();
console.log(targetControl.errors); // { [NbControlErrType.NOT_EQUAL]: true; }
```

<br>

#### NbFormValidators.fileSize
##### `v12.0.0`
###### File size validator

##### Params
| Name  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| fileSize  | `{ max?: number; min?: number }`  | true  | The limit of file size. You can set the max/min limit alone. The limit value's unit is `B`. | `v12.0.0` |

##### Return
| Type  | Description  |
| ------------ | ------------ |
| `{ [NbControlErrType.FILE_MAX_SIZE]?: true;[NbControlErrType.FILE_MIN_SIZE]?: true; }｜null`  | The result. If is is null, the condition is met or the control's value is not a `File` type value. If the result is `{ [NbControlErrType.FILE_MAX_SIZE]: true }`, the file size is greater than the max limit value. If the result is `{ [NbControlErrType.FILE_MIN_SIZE]: true }`, the file size is less than the min limit value. |

##### Usage
```ts
const control = new FormControl(new File(),[NbFormValidators.fileSize({max:5,min:3})]);
console.log(control.errors); // { [NbControlErrType.FILE_MAX_SIZE]: true; } / { [NbControlErrType.FILE_MIN_SIZE]?: true; }
```

<br>

#### NbFormValidators.fileType
##### `v12.0.0`
###### File type validator

##### Params
| Name  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| types  | `string[]`  | true  | The file types you want to support. The types value should be `MIME Type` value. | `v12.0.0` |

##### Return
| Type  | Description  |
| ------------ | ------------ |
| `{ [NbControlErrType.FILE_TYPE]: true; }｜null`  | The result. If it is null, the condition is met or the value of control is not a `File`value. If the result is `{ [NbControlErrType.FILE_TYPE]: true }`, the control's file type is among the types to be supported |

##### Usage
```ts
const control = new FormControl(new File(),[NbFormValidators.fileType(['image/jpeg','image/png'])]);
console.log(control.errors); // { [NbControlErrType.FILE_TYPE]: true; }
```

<br>

#### NbFormValidators.required
##### `v12.0.0`
###### Required validator

##### Params
| Name  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| required  | `boolean`  | false  | Is the control required. The default is `true`. If the param is `true`, it will call the `Validators.required`, otherwise it will not do the check | `v12.0.0` |

##### Return
| Type  | Description  |
| ------------ | ------------ |
| `{ [NbControlErrType.REQUIRED]: true; }｜null`  | The result. If it is null, the condition is met. If the result is `{ [NbControlErrType.REQUIRED]: true }`, the control's value shoule be required. |

##### Usage
```ts
const control = new FormControl('',[NbFormValidators.required(true)])
console.log(control.errors); // { [NbControlErrType.REQUIRED]: true; }
```

<br>

#### NbFormValidators.whitespace
##### `v12.0.0`
###### Can all be whitespace validator

##### Params
| Name  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| canWhitespace  | `boolean`  | false  | Can the control's value all be whitespace? The default is `true`. If the param is `true`, user can only enter whitespaces.  | `v12.0.0` |

##### Return
| Type  | Description  |
| ------------ | ------------ |
| `{ [NbControlErrType.WHITESPACE]: true; }｜null`  | The result. If it is null, the condition is met. If the result is `{ [NbControlErrType.WHITESPACE]: true }`, the condition is not met. |

##### Usage
```ts
const control =new FormControl('    ',[NbFormValidators.whitespace(false)])
console.log(control.errors); // { [NbControlErrType.WHITESPACE]: true; }
```

<br>

### Services

#### NbFormService
##### `v12.0.0`
###### A `service` which provide some common function about form

##### Methods
| Name  | Return  | Description  | Scenes  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| getValidatorsFromControlConfig(config: INbControlConfig)  | `ValidatorFn[]`  | Get the validator list based on the config param. The config you can set inlcude `required`,`max`,`min`,`maxLength`,`minLength`,`arrMaxLength`,`arrMinLength`,`maxFileSize`,`minFileSize`,`fileType`,`pattern`,`whitespace`. And `max`,`min`,`maxLength`,`minLength`,`pattern` will return the validators from `Validators`, others is from `NbFormValidators` | When you need to quickly set the validator list based on configuration information  | `v12.0.0` |
| markAllAsDirty(control: NbAbstractControl, opts?: { onlySelf?: boolean; emitEvent?: boolean; }) | `void`  | Mark the control and its sub-controls as dirty. The `control` is the target which you want to mark, `opts` param will be set to the control and its sub-controls | If you want to mark a control and its sub-controls as dirty  | `v12.0.0` |
| showAllErrInfo(control: NbAbstractControl, opts?: { onlySelf?: boolean; emitEvent?: boolean; })  | `void`  | Show the control and its sub-controls all error information. It will call the `control.markAllAsTouched`,`markAllAsDirty`,`updateAllValueAndValidity` functions to make the error info be displayed on UI. The `control` is the target you want to do. The `opts` param will be set to the control and its sub-controls when calling the `markAllAsDirty`,`updateAllValueAndValidity` functions | When you want to show the error info of control and its sub-controls to user, like submitting the form | `v12.0.0` |
| updateAllValueAndValidity(control: NbAbstractControl, opts?: { onlySelf?: boolean; emitEvent?: boolean; }) | `void`  | Update the control and its sub-controls vaules and validities. The `control` param is the target you want to do, `opts` param will be set to the control and its sub-controls | When you want to update the control and its sub-controls vaules and validities | `v12.0.0` |
| updateEqualControlsValidities(controls: { target: AbstractControl; compared: AbstractControl }, destroy$?: Subject<any>) | `Subscription`  | Update the validities of the controls which want to be equal. The event will be done until one of the tow controls' status has been changed. This is a subscribe event and the return value of the function is the subscribe event index. So you can unsubribe it via the return value. Also you can input a `destroy$` param and next a value via the `destroy$` param to unsubscribe the event. | You can use it with `NbFormValidators.equal` validator, so the two controls' equal status can be updated in time, e.g. when change password, verify the new password and repeat new password are equal | `v12.1.0` |


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
// unsubscribe it via return value
const subscription = this.updateEqualControlsValidities(controls);
subscription.unsubscribe();
// unsubscribe it via destroy$
const destroy$ = new Subject<void>();
this.updateEqualControlsValidities(controls,destroy$);
destroy$.next();
destroy$.complete();

```

<br>

### Components

#### `<nb-control-err></nb-control-err>`
##### `v12.0.0`
###### The component is used to show error info of the control. The error info support `string` and `Observable<string>` type, so you can use it in i18n. You can set common error info in `providers`, it will combined with error info which is inputed from the component.

##### Input
| Name  | Type  | Default  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| control  | `AbstractControl`  | `-`  | The control which the error info belong.  | `v12.0.0` |
| errInfo  | `INbControlErrInfo`  | `{}`  | Error information which only belong the control. It will combined with the common error infos which are set in `providers`.  | `v12.0.0` |

##### Usage
```html
<!-- control = new FormControl() -->
<!-- errInfo = {required:'This field is required!'} -->
<nb-control-err [control]="control" [errInfo]="errInfo"></nb-control-err>
```

<br>

#### `<nb-field-item></nb-field-item>`
##### `v12.0.0`
###### The file item component, is used in form in common. It has common layout and can show error info
##### `[field-label]`
###### The file item's label

##### Input
| Name  | Type  | Default  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| control  | `AbstractControl ｜ undefined`  | `-`  | The control which error info belong. | `v12.0.0` |
| errInfo  | `INbControlErrInfo`  | `{}` | The error information. If it is undefined, the final error info is only the common error info from `providers` | `v12.0.0` |
| required  | `boolean`  | `false` | Is the field required? If is is `true`, there will display "*". The default is `false` | `v12.0.0` |

##### Usage
```html
<!-- set the field's label and field content. If there does not have control params, the error info will not be displayed -->
<nb-field-item>
  <ng-container field-label>field 1</ng-container>
  <input>
</nb-field-item>

<!-- Set the filed is required, and will display the error info -->
<nb-field-item [required]="true" [control]="control" [errInfo]="errInfo">
  <ng-container field-label>field 2</ng-container>
  <input>
</nb-field-item>

```

<br>

### Tokens

#### NB_CONTROL_COMMON_ERR_INFO
##### INbControlErrInfo
##### `v15.0.0`
#### NB_CONTROL_COMMON_ERR_INFO_TOKEN
##### INbControlErrInfo
##### `v12.0.0`, `@deprecated` from `v15.0.0`
###### Used to set common error info, so you don't need to set the common error info every where. If you set the common error info, it will auto be combined with the error info of `<nb-control-err></nb-control-err>` to be final error info.

##### Usage
```ts
  providers: [
    // ...
    {
      provide: NB_CONTROL_COMMON_ERR_INFO,
      useFactory: (transService: NbTransService) => ({
        [NbControlErrType.FILE_TYPE]: transService.translationAsync('fileType'),
        [NbControlErrType.FILE_MIN_SIZE]: 'The file min file is 50KB!',
      }),
      deps: [NbTransService]
    },
    // ...
  ]
```

<br>

### Interfaces

#### NbAbstractControl
##### `v12.0.0`
###### Abstract control, include `AbstractControl`, `null`, `undefined` 

<br>

#### INbControlConfig
##### `v12.0.0`
###### The config of control
| Property  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| required  | `boolean`  | false  | Is required limit | `v12.0.0` |
| max  | `number`  | false  | Max limit | `v12.0.0` |
| min  | `number`  | false  | Min limit | `v12.0.0` |
| maxLength  | `number`  | false  | Max length limit | `v12.0.0` |
| minLength  | `number`  | false  | Min length limit | `v12.0.0` |
| arrMaxLength  | `number`  | false  | Max length limit of array | `v12.0.0` |
| arrMinLength  | `number`  | false  | Min length limit of array | `v12.0.0` |
| maxFileSize  | `number`  | false  | Max size limit of file | `v12.0.0` |
| minFileSize  | `number`  | false  | Min size limit of file | `v12.0.0` |
| fileType  | `string[]`  | false  | The types limit of file | `v12.0.0` |
| pattern  | `string ｜ RegExp`  | false  | The pattern limit | `v12.0.0` |
| whitespace  | `boolean`  | false  | Can all be whitespace | `v12.0.0` |
| initValue  | `any`  | false  | Initial value | `v12.0.0` |
| placeholder  | `string`  | false  | placeholder | `v12.0.0` |
| [key: string]  | `any`  | false  | more configs | `v12.0.0` |

<br>

#### INbControlErrInfo
##### `v12.0.0`
###### Error informations. The key is the type of error, the value is error information
| Property  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| [key: string]  | `string｜Observable<string>`  | false  | The key is string type, and the value is string or Observable<string> type, so you can use it in i18n | `v12.0.0` |

<br>

#### INbFormConfigs
##### `v12.0.0`
###### The configs of form control
| Property  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| [key: string]  | `INbControlConfig`  | false  | The key is the control's name, the value is control's configs | `v12.0.0` |

<br>

### Enums
#### NbControlErrType
##### `v15.0.0`
#### NbControlErrTypeEnum
##### `v12.0.0`, `@deprecated` from `v15.0.0`
###### Common error enum
| Key  | Value  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ |  
| REQUIRED  | `required`  | Required error | `v12.0.0` |
| FILE_MAX_SIZE  | `fileMaxSize`  | File max size error | `v12.0.0` |
| FILE_MIN_SIZE  | `fileMinSize`  | File min size error | `v12.0.0` |
| FILE_TYPE  | `fileType`  | File type error | `v12.0.0` |
| EQUAL  | `equal`  | Equal error | `v12.0.0` |
| MAX_LENGTH  | `maxlength`  | Max length error | `v12.0.0` |
| MIN_LENGTH  | `minlength`  | Min length error | `v12.0.0` |
| ARR_MAX_LENGTH  | `arrMaxLength`  | Max length of array error | `v12.0.0` |
| ARR_MIN_LENGTH  | `arrMinLength`  | Min length of array error | `v12.0.0` |
| WHITESPACE  | `whitespace`  | whitespace error | `v12.0.0` |

<br>

### Contribution
> Feature and PR are welcome to make this project better together

<a href="https://github.com/bigBear713" target="_blank"><img src="https://avatars.githubusercontent.com/u/12368900?v=4" alt="bigBear713" width="30px" height="30px"></a>

<br>

### License
MIT