import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NbTransLangEnum, NbTransService } from '@bigbear713/nb-trans';
import { NbControlErrTypeEnum, NbFormService, NbFormValidators } from 'nb-form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  form: FormGroup | undefined;

  errMapping1 = {
    [NbControlErrTypeEnum.REQUIRED]: this.transService.translationAsync('required'),
  };

  errMapping2 = {
    [NbControlErrTypeEnum.FILE_MAX_SIZE]: 'The file max file is 100kb!',
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

  constructor(
    private fb: FormBuilder,
    private formService: NbFormService,
    private transService: NbTransService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  changeLanguage(langKey: string) {
    this.transService.changeLangSync(
      langKey === 'en' ? NbTransLangEnum.EN : NbTransLangEnum.ZH_CN
    );
  }

  onChangeFile($event: Event): void {
    const fileEle = $event.target as HTMLInputElement;
    if (fileEle && fileEle.files?.length) {
      this.field3Ctrl.setValue(fileEle.files[0]);
      this.field3Ctrl.markAsTouched();
    }
  }

  private buildForm(): void {
    this.form = this.fb.group({
      field1: [null, [NbFormValidators.required(true)]],
      field2: [null, this.formService.getValidatorsFromControlConfig({ whitespace: false })],
      field3: [undefined, [
        NbFormValidators.fileType(['image/svg+xml', 'image/jpeg']),
        NbFormValidators.fileSize({ maxSize: 500 * 1000, minSize: 100 * 1000 }),
      ]],
    });
  }
}
