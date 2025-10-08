
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';
import { Routes } from '@angular/router';
import { NbTransModule } from '@bigbear713/nb-trans';
import { NbControlErrType, NbFormModule, NbFormService } from 'nb-form';

@Component({
  imports: [NbFormModule, NbTransModule, FormsModule, ReactiveFormsModule],
  selector: 'app-feature1',
  templateUrl: './feature1.component.html',
  styleUrls: ['./feature1.component.css'],
})
export class Feature1Component implements OnInit {
  form!: FormGroup;

  errInfo2 = {
    [NbControlErrType.FILE_MAX_SIZE]: 'The file max size is 500kb!',
  };

  get field1Ctrl(): UntypedFormControl {
    return this.form?.get('field1') as UntypedFormControl;
  }

  constructor(
    private fb: UntypedFormBuilder,
    private formService: NbFormService
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  onChangeFile($event: Event): void {
    const fileEle = $event.target as HTMLInputElement;
    if (fileEle && fileEle.files?.length) {
      this.field1Ctrl.markAsDirty();
      this.field1Ctrl.setValue(fileEle.files[0]);
    }
  }

  private buildForm() {
    this.form = this.fb.group({
      field1: [
        null,
        this.formService.getValidatorsFromControlConfig({
          fileType: ['image/svg+xml', 'image/jpeg'],
          maxFileSize: 500 * 1000,
          minFileSize: 100 * 1000,
        }),
      ],
    });
  }
}

export const routes: Routes = [{ path: '', component: Feature1Component }];
