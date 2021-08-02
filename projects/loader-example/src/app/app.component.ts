import { PepDialogService } from '@pepperi-addons/ngx-lib/dialog';
import { Router } from '@angular/router';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { PepMenuItem } from '@pepperi-addons/ngx-lib/menu';
import { RemoteModuleOptions } from '@pepperi-addons/ngx-remote-loader';

@Component({
  selector: 'addon-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('dialogTemplate', { read: TemplateRef })
  textAreaDialogTemplate: TemplateRef<any>;
  plugins: RemoteModuleOptions[] = [];
  workflow: RemoteModuleOptions[] = [];
  showConfig = false;
  menuItemsDialog: Array<PepMenuItem> = [];
  menuItemsLoad: Array<PepMenuItem> = [];
  menuItemsNavigate: Array<PepMenuItem> = [];
  menuItems: Array<PepMenuItem> = [];
  dialogRef;
  dialogAddon;
  buttonPlugins;
  title = 'loader-example';
  subAddons: RemoteModuleOptions[] =[];

  constructor(
    private router: Router,
    private dialog: PepDialogService
  ){}

  async ngOnInit() {
    await this.lookup().then(plugins => {
      plugins.forEach(p => {
        this.menuItemsNavigate.push({key: p.displayName, text: 'Navigate To ' + p.displayName });
        this.menuItemsDialog.push({key: p.displayName, text: 'Open ' + p.displayName + ' in Dialog' });
        this.menuItemsLoad.push({key: p.displayName, text: 'Load ' + p.displayName});
        this.plugins.push(p);

    });

    this.menuItemsNavigate = this.menuItemsNavigate.splice(2);
    this.menuItemsDialog = this.menuItemsDialog.splice(0,2);
    this.menuItemsLoad = this.menuItemsLoad.splice(0,2);
    this.menuItems = [...this.menuItemsNavigate, ...this.menuItemsLoad, ...this.menuItemsDialog]

    });

  }

  lookup(): Promise<RemoteModuleOptions[]> {
    return Promise.resolve([
      {
          remoteEntry: 'http://localhost:3000/remoteEntry.js',
          remoteName: 'mfe1',
          exposedModule: './DownloadModule',
          displayName: 'Remote Module',
          componentName: 'DownloadComponent'
      },
      {
          remoteEntry: 'http://localhost:3000/remoteEntry.js',
          remoteName: 'mfe1',
          exposedModule: './Upload',
          displayName: 'Remote Component',
          componentName: 'UploadComponent'
      },
      // {
      //     remoteEntry: 'http://localhost:3001/remoteEntry.js',
      //     remoteName: 'mfe2',
      //     exposedModule: './Analyze',

      //     displayName: 'Analyze component',
      //     componentName: 'AnalyzeComponent'
      // },
      // {
      //     remoteEntry: 'http://localhost:3001/remoteEntry.js',
      //     remoteName: 'mfe2',
      //     exposedModule: './Enrich',

      //     displayName: 'Enrich component',
      //     componentName: 'EnrichComponent'
      // },
      {
          remoteEntry: 'http://localhost:3001/remoteEntry.js',
          remoteName: 'mfe2',
          exposedModule: './Enrich',

          displayName: 'Themes',
          componentName: 'EnrichComponent',
          path: 'themes',
          uuid: '95501678-6687-4fb3-92ab-1155f47f839e'
      },
      {
          remoteEntry: 'http://localhost:3001/remoteEntry.js',
          remoteName: 'mfe2',
          exposedModule: './Enrich',

          displayName: 'Addon Manager',
          componentName: 'EnrichComponent',
          path: 'addons_manager',
          uuid: 'bd629d5f-a7b4-4d03-9e7c-67865a6d82a9'
      }

  ] as RemoteModuleOptions[] & any[]);
}
openSubAddonAsDialog(plugin: RemoteModuleOptions): void {


  const config = this.dialog.getDialogConfig(
    { // maxWidth: '90vw', // maxHeight: '90vh'
    },
    'regular'
  );
  this.dialogRef = this.dialog.openDialog(this.textAreaDialogTemplate, { addon: plugin}, config);
  // dialogRef.componentInstance.options = plugin;


}

addSubAddonToPage(plugin: RemoteModuleOptions): void {
  this.workflow.push(plugin);
}

toggle(): void {
  this.showConfig = !this.showConfig;
}

closeDialog(data = null){
  this.dialogRef.close(data);
}

onMenuItemClicked(e){
  this.dialogAddon = this.plugins.filter(p => p.displayName === e.source.key)[0];

  if (e.source.text.indexOf('Navigate') > -1){
    this.router.navigate(['settings', this.dialogAddon.uuid, this.dialogAddon.path]);
  }
  else if (e.source.text.indexOf('Dialog') > -1){
    this.openSubAddonAsDialog(this.dialogAddon);
  }
  else if (e.source.text.indexOf('Load') > -1){
    this.addSubAddonToPage(this.dialogAddon);
  }
}
}
