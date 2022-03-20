import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NbTransLangEnum, NbTransModule, NbTransService, NB_TRANS_LOADER } from '@bigbear713/nb-trans';
import {
  NbFormModule,
  NbControlErrTypeEnum,
  NB_CONTROL_COMMON_ERR_INFO_TOKEN
} from 'nb-form';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NbFormModule,
    NbTransModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: NB_CONTROL_COMMON_ERR_INFO_TOKEN,
      useFactory: (transService: NbTransService) => ({
        [NbControlErrTypeEnum.FILE_TYPE]: transService.translationAsync('errors.fileType'),
        [NbControlErrTypeEnum.FILE_MIN_SIZE]: 'The file min file is 100KB!',
        [NbControlErrTypeEnum.EQUAL]: '两个控件值不相等',
      }),
      deps: [NbTransService]
    },
    {
      provide: NB_TRANS_LOADER,
      useFactory: (http: HttpClient) => {
        return {
          [NbTransLangEnum.ZH_CN]: () => http.get('./assets/localization/zh-CN/translations.json'),
          [NbTransLangEnum.EN]: () => http.get('./assets/localization/en/translations.json'),
        };
      },
      deps: [HttpClient]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
