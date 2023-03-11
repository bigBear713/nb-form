import { NgModule } from '@angular/core';
import { NbControlErrComponent, NbFieldItemComponent } from './components';

const COMPS = [
  NbControlErrComponent,
  NbFieldItemComponent,
];

@NgModule({
  imports: [...COMPS],
  exports: [...COMPS]
})
export class NbFormModule { }
