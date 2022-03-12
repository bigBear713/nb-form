import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { INbControlErrMapping } from '../../models';

@Component({
  selector: 'nb-field-item',
  template: `
  <label class="field-label">
    <span *ngIf="required" class="label-required">*</span>
    <ng-content select="[field-label]"></ng-content>
  </label>
  <div class="field-content">
    <ng-content></ng-content>
    <nb-control-err [control]="control" [errMapping]="errMapping"></nb-control-err>
  </div>
`,
  styleUrls: ['./field-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbFieldItemComponent {
  @Input() control: AbstractControl | undefined;

  @Input() errMapping: INbControlErrMapping = {};

  @Input() required: boolean = false;
}
