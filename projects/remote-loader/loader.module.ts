import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PepAddonLoaderComponent } from './loader.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    exports: [PepAddonLoaderComponent],
    declarations: [PepAddonLoaderComponent],
    providers: [
        // PepSessionService
    ]
})
export class PepAddonLoaderModule {


}
