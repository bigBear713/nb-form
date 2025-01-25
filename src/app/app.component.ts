import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { NbTransLang, NbTransService } from '@bigbear713/nb-trans';
import { NbControlErrType, NbFormService, NbFormValidators } from 'nb-form';
import { GTagService } from './g-tag.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
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

  links = {
    changelog: {
      title: 'Changelog',
      link: 'https://github.com/bigBear713/nb-form/blob/main/CHANGELOG.md',
    },
    document: {
      title: 'Document',
      link: 'https://github.com/bigBear713/nb-form/blob/main/projects/nb-form/README.md',
    },
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
    private gtagService: GTagService,
    private transService: NbTransService
  ) {}

  ngOnInit(): void {
    this.trackPage();
    this.buildForm();
    // you can use it to unsubscribe when destroy the form/component
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const subscription = this.formService.updateEqualControlsValidities({
      target: this.field4Ctrl,
      compared: this.field5Ctrl,
    });
  }

  changeLanguage(langKey: string) {
    const lang = langKey === 'en' ? NbTransLang.EN : NbTransLang.ZH_CN;
    this.transService.changeLangSync(lang);
    this.gtagService.trackButton({
      button_name: 'zh-CN' === lang ? '切换为中文' : 'switch as English',
      language: lang,
    });
  }

  go2Link(target: { title: string; link: string }): void {
    this.gtagService.trackLink({
      link_name: target.title,
      link: target.link,
    });
  }

  resetCtrl1() {
    this.field1Ctrl.reset();
    this.gtagService.trackButton({
      button_name: 'reset field',
    });
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
    this.gtagService.trackButton({
      button_name: 'submit',
    });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      field1: [null, [NbFormValidators.required(true)]],
      field2: [null, [NbFormValidators.whitespace(false)]],
      field3: [
        undefined,
        this.formService.getValidatorsFromControlConfig({
          fileType: ['image/svg+xml', 'image/jpeg'],
          maxFileSize: 500 * 1000,
          minFileSize: 100 * 1000,
        }),
      ],
      field4: [''],
      field5: [null],
      field6: [null, [NbFormValidators.required(true)]],
    });
    this.field4Ctrl.setValidators([NbFormValidators.equal(this.field5Ctrl, false)]);
    this.field5Ctrl.setValidators([NbFormValidators.equal(this.field4Ctrl, false)]);

    this.field6Ctrl.markAsDirty();
  }

  private trackPage() {
    this.gtagService.trackPage({
      page_name: 'homepage',
    });
  }
}
