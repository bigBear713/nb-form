import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { INbControlErrInfo } from '../../models';
import { NbControlErrComponent } from '../control-err/control-err.component';

const importsFromNgCommon = [NgIf];
const importsFromSelf = [NbControlErrComponent];

@Component({
  imports: [...importsFromNgCommon, ...importsFromSelf],
  selector: 'nb-field-item',
  template: `
    <!-- eslint-disable-next-line @angular-eslint/template/label-has-associated-control -->
    <label class="field-label">
      <span *ngIf="required" class="label-required">*</span>
      <ng-content select="[field-label]"></ng-content>
    </label>
    <div class="field-content">
      <ng-content></ng-content>
      <nb-control-err
        *ngIf="control"
        class="nb-control-err"
        [control]="control"
        [errInfo]="errInfo"></nb-control-err>
    </div>
  `,
  styleUrls: ['./field-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbFieldItemComponent {
  @Input() control: AbstractControl | undefined;

  @Input() errInfo: INbControlErrInfo = {};

  @Input() required: boolean | undefined = false;
}
