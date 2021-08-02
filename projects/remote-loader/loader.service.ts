import { Injectable } from '@angular/core';
import { PepSessionService } from '@pepperi-addons/ngx-lib';
@Injectable({
  providedIn: 'root'
})
export class PepAddonLoaderService {

    constructor(private session: PepSessionService) {

    }

    setAddonPath(uuid: string, url: string){
      const addonsDictionary = this.session.getObject('AddonsDictionary') ?? {};
      addonsDictionary[uuid] = url;
      this.session.setObject('AddonsDictionary', addonsDictionary);
    }

    getAddonPath(uuid: string){
      const addonsDictionary = this.session.getObject('AddonsDictionary')
      return addonsDictionary[uuid];
    }

    // abstract onMenuClicked();

    // abstract onMenuItemClicked(e: IPepMenuItemClickEvent): void;

    // abstract openDialog(remoteModule: RemoteModuleOptions): void ;

    // abstract addonApi(remoteModule: RemoteModuleOptions);

    // abstract postAddonApi(remoteModule: RemoteModuleOptions, dialogData);

}
