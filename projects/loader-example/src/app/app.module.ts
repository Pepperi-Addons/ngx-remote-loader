import { MaterialModule } from './modules/material.module';
import { PepUIModule } from './modules/pepperi.module';
import { PepRemoteLoaderModule } from '@pepperi-addons/ngx-remote-loader';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PepRemoteLoaderModule,
    HttpClientModule,
    PepUIModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
