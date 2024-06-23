import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NbTransLang, NbTransModule, NbTransService, NB_TRANS_LOADER } from '@bigbear713/nb-trans';
import { NbFormModule, NbControlErrType, NB_CONTROL_COMMON_ERR_INFO } from 'nb-form';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NbFormModule,
        NbTransModule,
        AppRoutingModule], providers: [
        {
            provide: NB_CONTROL_COMMON_ERR_INFO,
            useFactory: (transService: NbTransService) => ({
                [NbControlErrType.FILE_TYPE]: transService.translationAsync('errors.fileType'),
                [NbControlErrType.FILE_MIN_SIZE]: 'The file min size is 100KB!!!!',
                [NbControlErrType.EQUAL]: '两个控件值不相等',
            }),
            deps: [NbTransService],
        },
        {
            provide: NB_TRANS_LOADER,
            useFactory: (http: HttpClient) => {
                return {
                    [NbTransLang.ZH_CN]: () => http.get('./assets/localization/zh-CN/translations.json'),
                    [NbTransLang.EN]: () => http.get('./assets/localization/en/translations.json'),
                };
            },
            deps: [HttpClient],
        },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {}
