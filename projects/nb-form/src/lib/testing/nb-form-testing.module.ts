import { NgModule } from "@angular/core";
import { NbFormModule } from "../nb-form.module";
import { NbFormService } from "../services";

@NgModule({
  providers: [NbFormService],
  exports: [NbFormModule]
})
export class NbFormTestingModule { }