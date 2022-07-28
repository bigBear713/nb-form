import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  SimpleChanges
} from '@angular/core';
import { AbstractControl, UntypedFormControl } from '@angular/forms';
import { INbControlErrInfo } from '../../models';
import { NB_CONTROL_COMMON_ERR_INFO_TOKEN } from '../../constants';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NbControlErrComponent implements OnChanges, OnDestroy {

  @Input() control!: AbstractControl;

  @Input() errInfo: INbControlErrInfo = {};

  allErrInfo: INbControlErrInfo = {};

  errControl = new UntypedFormControl();

  hasErr: boolean = false;

  private destroy$ = new Subject();

  constructor(
    @Inject(NB_CONTROL_COMMON_ERR_INFO_TOKEN)
    @Optional()
    private commonErrInfo: INbControlErrInfo = {},
    private changeDR: ChangeDetectorRef,
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateAllErrInfo(): void {
    this.allErrInfo = {
      ...this.commonErrInfo,
      ...this.errInfo,
    };
    this.changeDR.markForCheck();
  }

  private subscribeControlChange(): void {
    this.updateHasErr(this.control);
    this.control.statusChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      _ => this.updateHasErr(this.control)
    );
  }

  private updateHasErr(control: AbstractControl): void {
    this.hasErr = control.dirty && control.status === 'INVALID';
    this.changeDR.markForCheck();
  }
}
