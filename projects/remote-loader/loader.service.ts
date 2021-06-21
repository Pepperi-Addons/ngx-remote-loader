import { Injectable } from '@angular/core';
import { IPepMenuItemClickEvent } from '@pepperi-addons/ngx-lib/menu';
import { RemoteModuleOptions } from '@pepperi-addons/ngx-remote-loader/loader.model';

@Injectable({
  providedIn: 'root'
})
export abstract class LoaderService {

    abstract onMenuClicked();

    abstract onMenuItemClicked(e: IPepMenuItemClickEvent): void;

    abstract openDialog(remoteModule: RemoteModuleOptions): void ;

    abstract addonApi(remoteModule: RemoteModuleOptions);

    abstract postAddonApi(remoteModule: RemoteModuleOptions, dialogData);

}
