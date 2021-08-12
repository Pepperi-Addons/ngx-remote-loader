import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PepAddonLoaderComponent } from './loader.component';
// import { PepSessionService } from '@pepperi-addons/ngx-lib';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        // MatProgressSpinnerModule
    ],
    exports: [PepAddonLoaderComponent],
    declarations: [PepAddonLoaderComponent],
    providers: [
        // PepSessionService
    ]
})
export class PepAddonLoaderModule {


}
