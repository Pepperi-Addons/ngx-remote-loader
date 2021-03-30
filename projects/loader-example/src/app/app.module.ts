// import { SubAddonModule } from './sub-addon/module';
import { MaterialModule } from './modules/material.module';
import { PepUIModule } from './modules/pepperi.module';
import { PepRemoteLoaderModule } from '@pepperi-addons/ngx-remote-loader';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

const routes = [{
  path: 'settings/:addon_uuid',
  component: AppComponent

},
  {
      path: '**',
      component: EmptyRouteComponent
  }];
@NgModule({
  declarations: [
    AppComponent,
    EmptyRouteComponent
  ],
  imports: [
    BrowserModule,
    PepRemoteLoaderModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    PepUIModule,
    MaterialModule
    // SubAddonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AddonModule { }
