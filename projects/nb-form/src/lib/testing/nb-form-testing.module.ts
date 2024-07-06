import { NgModule } from '@angular/core';
import { NbFormModule } from '../nb-form.module';
import { NbFormService, NbFormToolsService } from '../services';

@NgModule({
  imports: [NbFormModule],
  providers: [NbFormService, NbFormToolsService],
  exports: [NbFormModule],
})
export class NbFormTestingModule {}
