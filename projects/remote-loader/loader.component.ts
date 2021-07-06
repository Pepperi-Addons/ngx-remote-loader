import { PepAddonService } from '@pepperi-addons/ngx-lib';
import { Component, Input, OnChanges, ViewChild, ViewContainerRef, ComponentFactoryResolver,
  Injector, NgModuleFactory, Compiler, EventEmitter, Output, ComponentRef, SimpleChanges, NgZone,
  ɵcreateInjector as createInjector,
  ɵrenderComponent as renderComponent ,
  ɵmarkDirty as markDirty,
  ɵLifecycleHooksFeature,
  ModuleWithComponentFactories,
  ModuleWithProviders,
  InjectionToken} from '@angular/core';
import { loadRemoteModule, LoadRemoteModuleOptions } from '@angular-architects/module-federation';
import { RemoteModuleOptions } from './loader.model';
import { LifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
@Component({
    selector: 'addon-proxy',
    template: `
        <ng-template #placeHolder></ng-template>
    `
})
export class PepRemoteLoaderComponent implements OnChanges {
    @ViewChild('placeHolder', { read: ViewContainerRef, static: true })
    viewContainer: ViewContainerRef;
    compRef: ComponentRef<any>;
    @Input() hostObject: RemoteModuleOptions & object;
    @Output() hostEvents: EventEmitter<any> =  new EventEmitter();

    constructor(
      private injector: Injector,
      private cfr: ComponentFactoryResolver,
      private compiler: Compiler,
      private zone: NgZone,
      private addon: PepAddonService
      ) { }

    async ngOnChanges(changes: SimpleChanges) {
      if (changes?.hostObject?.currentValue){
        this.loadAddon(changes?.hostObject?.currentValue);

      }
    }

    async loadAddon(hostObject: RemoteModuleOptions & LoadRemoteModuleOptions){
      const t0 = performance.now();
      // Check if only need update
      if (!hostObject?.update){
        this.viewContainer?.clear();
        // Load Component
        if (hostObject?.noModule) {
          const component = await loadRemoteModule(hostObject).then(m => m[hostObject.componentName]);
          const componentFactory = this.cfr.resolveComponentFactory(component);
          this.compRef = this.viewContainer.createComponent(componentFactory, null, this.injector);
        }
        // Load Module
        else {
          const publicPathArr = hostObject.remoteEntry.split('/');
          this.addon.setAddonStaticFolder(publicPathArr.slice(0, publicPathArr.length - 1).join('/')+'/');
          const module =  await loadRemoteModule(hostObject).then(m => m);
          let moduleFactory: NgModuleFactory<any>;
          moduleFactory = this.compiler.compileModuleSync(module[hostObject.exposedModule.replace('./','')]);

          const moduleRef = moduleFactory.create(this.injector);
          const componentFactory = moduleRef?.componentFactoryResolver?.resolveComponentFactory(module[hostObject.componentName]);
          this.compRef = this.viewContainer.createComponent(componentFactory, null, moduleRef.injector, null, moduleRef);
          const t1 = performance.now();
          console.log('remote module load performance: ' + (t1-t0)/1000);

        }
      }
      if (this.compRef){

        // Send @Input() values
        // this.compRef.changeDetectorRef.markForCheck();
        this.compRef.instance.hostObject = hostObject;

        // Listen to @Output() events
          if (this.compRef?.instance?.ngOnChanges){
            this.compRef.instance.ngOnChanges(hostObject);
          }
        this.compRef?.instance['hostEvents']?.subscribe(e => this.hostEvents.emit(e));
        // this.viewContainer.element.nativeElement.addEventListener('customEvent', () => {
        //   setTimeout(() => {});});
      }


    }

    ngOnDestroy(): void {
      this.viewContainer?.clear();
    }
}

