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
import { AbstractControl, FormControl } from '@angular/forms';
import { INbControlErrMapping } from '../../models';
import { NB_CONTROL_COMMON_ERR_MAPPING_TOKEN } from '../../constants';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'nb-control-err',
  template: `<div *ngIf="hasErr" [nb-r-str]="control.errors|nbErrInfo:allErrMapping"></div>`,
  styles: [`
    :host {
      position: absolute;
      top: 100%;
      left: 0;
      color: red;
      font-size: 14px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NbControlErrComponent implements OnChanges, OnDestroy {

  @Input() control!: AbstractControl;

  @Input() errMapping: INbControlErrMapping = {};

  allErrMapping: INbControlErrMapping = {};

  errControl = new FormControl();

  hasErr: boolean = false;

  private destroy$ = new Subject();

  constructor(
    @Inject(NB_CONTROL_COMMON_ERR_MAPPING_TOKEN)
    @Optional()
    private commonErrMapping: INbControlErrMapping = {},
    private changeDR: ChangeDetectorRef,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    const { control, errMapping } = changes;
    if (control) {
      this.subscribeControlChange();
    }
    if (errMapping) {
      this.updateAllErrMapping();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateAllErrMapping(): void {
    this.allErrMapping = {
      ...this.commonErrMapping,
      ...this.errMapping,
    };
    this.changeDR.markForCheck();
  }

  private subscribeControlChange(): void {
    this.updateHasErr(false);
    this.control.statusChanges.pipe(
      startWith(null),
      takeUntil(this.destroy$)
    ).subscribe(
      (status) => {
        const hasErr = this.control.dirty && status === 'INVALID';
        this.updateHasErr(hasErr);
      }
    );
  }

  private updateHasErr(hasErr: boolean): void {
    this.hasErr = hasErr;
    this.changeDR.markForCheck();
  }
}
