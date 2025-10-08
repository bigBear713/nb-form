import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { INbControlErrInfo } from '../../models';
import { NB_CONTROL_COMMON_ERR_INFO } from '../../constants';
import { NbErrInfoPipe } from '../../pipes/err-info.pipe';
import { NbRStrComponent, NbUnsubscribeService } from '@bigbear713/nb-common';

const importsFromNbCommon = [NbRStrComponent];
const importsFromSelf = [NbErrInfoPipe];

@Component({
  imports: [...importsFromNbCommon, ...importsFromSelf],
  selector: 'nb-control-err',
  template: `@if (control && hasErr) {
    <div class="err-info" [nb-r-str]="control.errors | nbErrInfo: allErrInfo"></div>
  }`,
  styles: [
    `
      :host {
        position: relative;
        top: 100%;
        left: 0;
        display: block;
        font-size: 14px;
        color: red;
      }
      .err-info {
        position: absolute;
        top: 0;
        left: 0;
        word-break: break-word;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NbUnsubscribeService],
})
export class NbControlErrComponent implements OnChanges {
  private commonErrInfo: INbControlErrInfo =
    inject(NB_CONTROL_COMMON_ERR_INFO, { optional: true }) || {};
  private changeDR: ChangeDetectorRef = inject(ChangeDetectorRef);
  private unsubscribeService: NbUnsubscribeService = inject(NbUnsubscribeService);

  @Input({ required: true }) control!: AbstractControl;

  @Input() errInfo: INbControlErrInfo = {};

  allErrInfo: INbControlErrInfo = {};

  hasErr: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    const { control, errInfo } = changes;
    if (control) {
      this.subscribeControlChange();
    }
    if (errInfo) {
      this.updateAllErrInfo();
    }
  }

  private subscribeControlChange(): void {
    this.updateHasErr(this.control);
    const subscription = this.control.statusChanges.subscribe(() =>
      this.updateHasErr(this.control)
    );
    this.unsubscribeService.collectASubscriptionByKey('control-status-changes', subscription);
  }

  private updateAllErrInfo(): void {
    this.allErrInfo = { ...this.commonErrInfo, ...this.errInfo };
    this.changeDR.markForCheck();
  }

  private updateHasErr(control: AbstractControl): void {
    this.hasErr = control.dirty && control.status === 'INVALID';
    this.changeDR.markForCheck();
  }
}
