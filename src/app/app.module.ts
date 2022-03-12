import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NbTransLangEnum, NbTransModule, NbTransService, NB_TRANS_LOADER } from '@bigbear713/nb-trans';
import {
  NbFormModule,
  NbControlErrTypeEnum,
  NB_CONTROL_COMMON_ERR_MAPPING_TOKEN
} from 'nb-form';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NbFormModule,
    NbTransModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: NB_CONTROL_COMMON_ERR_MAPPING_TOKEN,
      useFactory: (transService: NbTransService) => ({
        [NbControlErrTypeEnum.FILE_TYPE]: transService.translationAsync('fileType'),
        [NbControlErrTypeEnum.FILE_MIN_SIZE]: 'The file min file is 50KB!',
      }),
      deps: [NbTransService]
    },
    {
      provide: NB_TRANS_LOADER,
      useValue: {
        [NbTransLangEnum.ZH_CN]: {
          required: '这个字段为必填项！',
          fileType: '文件格式要求为jpg/svg!'
        },
        [NbTransLangEnum.EN]: {
          required: 'This field is required!',
          fileType: 'The file format should be jpg/svg!'
        },
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
