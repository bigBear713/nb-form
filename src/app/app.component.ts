import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { NbTransLangEnum, NbTransService } from '@bigbear713/nb-trans';
import { NbControlErrType, NbFormService, NbFormValidators } from 'nb-form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  form: UntypedFormGroup | undefined;

  errInfo1 = {
    [NbControlErrType.REQUIRED]: this.transService.translationAsync('errors.required'),
    [NbControlErrType.WHITESPACE]: this.transService.translationAsync('errors.required'),
  };

  errInfo2 = {
    [NbControlErrType.FILE_MAX_SIZE]: 'The file max size is 500kb!',
  };

  get field1Ctrl(): UntypedFormControl {
    return this.form?.get('field1') as UntypedFormControl;
  }

  get field2Ctrl(): UntypedFormControl {
    return this.form?.get('field2') as UntypedFormControl;
  }

  get field3Ctrl(): UntypedFormControl {
    return this.form?.get('field3') as UntypedFormControl;
  }

  get field4Ctrl(): UntypedFormControl {
    return this.form?.get('field4') as UntypedFormControl;
  }

  get field5Ctrl(): UntypedFormControl {
    return this.form?.get('field5') as UntypedFormControl;
  }

  get field6Ctrl(): UntypedFormControl {
    return this.form?.get('field6') as UntypedFormControl;
  }

  constructor(
    private fb: UntypedFormBuilder,
    private formService: NbFormService,
    private transService: NbTransService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    // you can use it to unsubscribe when destroy the form/component
    const subscription = this.formService.updateEqualControlsValidities({ target: this.field4Ctrl, compared: this.field5Ctrl });
  }

  changeLanguage(langKey: string) {
    this.transService.changeLangSync(
      langKey === 'en' ? NbTransLangEnum.EN : NbTransLangEnum.ZH_CN
    );
  }

  resetCtrl1() {
    this.field1Ctrl.reset();
  }

  onChangeFile($event: Event): void {
    const fileEle = $event.target as HTMLInputElement;
    if (fileEle && fileEle.files?.length) {
      this.field3Ctrl.markAsDirty();
      this.field3Ctrl.setValue(fileEle.files[0]);
    }
  }

  onSubmit() {
    this.formService.showAllErrInfo(this.form);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      field1: [null, [NbFormValidators.required(true)]],
      field2: [null, [NbFormValidators.whitespace(false)]],
      field3: [undefined, this.formService.getValidatorsFromControlConfig({
        fileType: ['image/svg+xml', 'image/jpeg'],
        maxFileSize: 500 * 1000, minFileSize: 100 * 1000
      })],
      field4: [''],
      field5: [null],
      field6: [null, [NbFormValidators.required(true)]],
    });
    this.field4Ctrl.setValidators([NbFormValidators.equal(this.field5Ctrl, false)]);
    this.field5Ctrl.setValidators([NbFormValidators.equal(this.field4Ctrl, false)]);

    this.field6Ctrl.markAsDirty();
  }
}
