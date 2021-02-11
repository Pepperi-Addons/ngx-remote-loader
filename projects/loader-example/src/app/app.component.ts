import { Component } from '@angular/core';
import { AddonOptions } from '@pepperi-addons/ngx-remote-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'loader-example';
  subAddons: AddonOptions[] =[];

  constructor(
  ){}

  async ngOnInit() {
    this.subAddons = await this.lookup();

  }

  lookup(): Promise<AddonOptions[]> {
    return Promise.resolve([
      {
        remoteEntry: 'http://localhost:3000/remoteEntry.js',
        remoteName: 'mfe1',
        exposedModule: './DownloadModule',
        useModule: true,
        displayName: 'Remote Module',
        componentName: 'DownloadComponent'
    },
        {
            remoteEntry: 'http://localhost:4404/settings-iframe.umd.js',
            exposedModule: 'SettingsIframeModule',
            componentName: 'SettingsIframeComponent',
            AddonUUID: "04de9428-8658-4bf7-8171-b59f6327bbf1",
            Editor: "transaction_types/ATD_ID/views",
            Index: 1,
            Key: "views",
            Title: "Views",
            Type: "tabs"
        },
        {
            remoteEntry: 'http://localhost:4404/settings-iframe.umd.js',
            exposedModule: 'SettingsIframeModule',
            componentName: 'SettingsIframeComponent',
            AddonUUID: "04de9428-8658-4bf7-8171-b59f6327bbf1",
            Editor: "transaction_types/ATD_ID/accounts",
            Index: 2,
            Key: "accounts",
            Title: "Accounts",
            Type: "tabs"
        }
    ] as AddonOptions[] & any[]);
}
}
