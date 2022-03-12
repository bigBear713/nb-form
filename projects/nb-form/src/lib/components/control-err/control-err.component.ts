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
import { INbControlErrMapping } from '../../models';
import { NB_CONTROL_DEFAULT_ERR_MAPPING_TOKEN } from '../../constants';

@Component({
  selector: 'nb-control-err',
  template: `<div *ngIf="control?.touched&&control?.errors" 
                  [nb-r-str]="control?.errors | nbErrInfo:allErrMapping"></div>`,
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
export class NbControlErrComponent implements OnChanges {

  @Input() control: AbstractControl | undefined;

  @Input() errMapping: INbControlErrMapping = {};

  allErrMapping: INbControlErrMapping = {};

  constructor(
    @Inject(NB_CONTROL_DEFAULT_ERR_MAPPING_TOKEN)
    @Optional()
    private defaultErrMapping: INbControlErrMapping = {},
    private changeDR: ChangeDetectorRef,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    const { errMapping } = changes;
    if (errMapping) {
      this.updateAllErrMapping();
    }
  }

  private updateAllErrMapping(): void {
    this.allErrMapping = {
      ...this.defaultErrMapping,
      ...this.errMapping,
    };
    this.changeDR.markForCheck();
  }
}
