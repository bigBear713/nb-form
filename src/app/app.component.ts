import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NbTransLangEnum, NbTransService } from '@bigbear713/nb-trans';
import { isEqual } from 'lodash-es';
import { NbControlErrTypeEnum, NbFormService, NbFormValidators } from 'nb-form';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  form: FormGroup | undefined;

  errInfo1 = {
    [NbControlErrTypeEnum.REQUIRED]: this.transService.translationAsync('errors.required'),
    [NbControlErrTypeEnum.WHITESPACE]: this.transService.translationAsync('errors.required'),
  };

  errInfo2 = {
    [NbControlErrTypeEnum.FILE_MAX_SIZE]: 'The file max size is 500kb!',
  };

  get field1Ctrl(): FormControl {
    return this.form?.get('field1') as FormControl;
  }

  get field2Ctrl(): FormControl {
    return this.form?.get('field2') as FormControl;
  }

  get field3Ctrl(): FormControl {
    return this.form?.get('field3') as FormControl;
  }

  get field4Ctrl(): FormControl {
    return this.form?.get('field4') as FormControl;
  }

  get field5Ctrl(): FormControl {
    return this.form?.get('field5') as FormControl;
  }

  get field6Ctrl(): FormControl {
    return this.form?.get('field6') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private formService: NbFormService,
    private transService: NbTransService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    combineLatest([
      this.field4Ctrl.statusChanges.pipe(startWith(this.field4Ctrl.status)),
      this.field5Ctrl.statusChanges.pipe(startWith(this.field5Ctrl.status))
    ]).pipe(
      distinctUntilChanged(
        (prev, curr) => isEqual(prev, curr)
      )
    ).subscribe((status) => {
      this.field4Ctrl.updateValueAndValidity();
      this.field5Ctrl.updateValueAndValidity();
    });
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
    this.field4Ctrl.setValidators([NbFormValidators.equal(this.field5Ctrl)]);
    this.field5Ctrl.setValidators([NbFormValidators.equal(this.field4Ctrl)]);

    this.field6Ctrl.markAsDirty();
  }
}
