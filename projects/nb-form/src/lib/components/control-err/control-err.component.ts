import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnChanges,
  Optional,
  SimpleChanges
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { INbControlErrInfo } from '../../models';
import { NB_CONTROL_COMMON_ERR_INFO } from '../../constants';
import { NgIf } from '@angular/common';
import { NbErrInfoPipe } from '../../pipes/err-info.pipe';
import { NbRStrComponent, UnsubscribeService } from '@bigbear713/nb-common';

const importsFromNgCommon = [NgIf];
const importsFromNbCommon = [NbRStrComponent];
const importsFromSelf = [NbErrInfoPipe];

@Component({
  standalone: true,
  imports: [...importsFromNgCommon, ...importsFromNbCommon, ...importsFromSelf],
  selector: 'nb-control-err',
  template: `<div *ngIf="control&&hasErr" class="err-info" [nb-r-str]="control.errors|nbErrInfo:allErrInfo"></div>`,
  styles: [`
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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UnsubscribeService]
})
export class NbControlErrComponent implements OnChanges {

  @Input() control!: AbstractControl;

  @Input() errInfo: INbControlErrInfo = {};

  allErrInfo: INbControlErrInfo = {};

  hasErr: boolean = false;

  constructor(
    @Inject(NB_CONTROL_COMMON_ERR_INFO)
    @Optional()
    private commonErrInfo: INbControlErrInfo = {},
    private changeDR: ChangeDetectorRef,
    private unsubscribeService: UnsubscribeService,
  ) { }

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
    const subscription = this.control.statusChanges.subscribe(
      _ => this.updateHasErr(this.control)
    );
    this.unsubscribeService.collectASubscriptionByKey('control-status-changes', subscription);
  }

  private updateAllErrInfo(): void {
    this.allErrInfo = {
      ...this.commonErrInfo,
      ...this.errInfo,
    };
    this.changeDR.markForCheck();
  }

  private updateHasErr(control: AbstractControl): void {
    this.hasErr = control.dirty && control.status === 'INVALID';
    this.changeDR.markForCheck();
  }
}
