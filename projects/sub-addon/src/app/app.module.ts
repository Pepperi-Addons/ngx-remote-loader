import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PepUIModule } from './modules/pepperi.module';
import { MaterialModule } from './modules/material.module';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {  MatNativeDateModule } from '@angular/material/core';
import {
  MatDatetimepickerModule,
  MatNativeDatetimeModule,
  DatetimeAdapter,
  MAT_DATETIME_FORMATS
} from '@mat-datetimepicker/core';
import { MomentDatetimeAdapter } from '@mat-datetimepicker/moment';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { DownloadModule } from './download/download.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  imports: [
    BrowserModule,
    PepUIModule,
MaterialModule,
DownloadModule,
FormsModule,
ReactiveFormsModule, MatMomentDateModule,
MatNativeDateModule,
MatDatepickerModule,
MatDatetimepickerModule,
MatNativeDatetimeModule,
TranslateModule.forRoot({
  loader: {
    provide: TranslateLoader,
    useFactory: (createTranslateLoader),
    deps: [HttpClient]
  }
})

  ],
  declarations: [
    AppComponent

  ],
  providers: [
    MatDatepickerModule,
    TranslateService,
    { provide: DatetimeAdapter, useClass: MomentDatetimeAdapter }
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule {

 }
