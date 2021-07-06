import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PepRemoteLoaderComponent } from './loader.component';
@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [PepRemoteLoaderComponent],
    declarations: [PepRemoteLoaderComponent],
})
export class PepRemoteLoaderModule {


}
