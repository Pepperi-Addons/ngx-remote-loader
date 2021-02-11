import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe.pipe';
import { SettingsIframeComponent } from './settings-iframe.component';
import { PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { PepTextboxModule } from '@pepperi-addons/ngx-lib/textbox';

@NgModule({
  declarations: [SettingsIframeComponent,
    SafePipe],
  imports: [
    CommonModule,
    PepTextboxModule,
    PepNgxLibModule
  ],
  exports: [SettingsIframeComponent]
})
export class SettingsIframeModule { }
