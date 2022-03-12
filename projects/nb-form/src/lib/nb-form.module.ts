import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbCommonModule } from '@bigbear713/nb-common';
import { NbControlErrComponent, NbFieldItemComponent } from './components';
import { NbErrInfoPipe } from './pipes/err-info.pipe';

const COMPS = [
  NbControlErrComponent,
  NbFieldItemComponent,
];

@NgModule({
  declarations: [...COMPS, NbErrInfoPipe],
  imports: [CommonModule, NbCommonModule],
  exports: [...COMPS]
})
export class NbFormModule { }
