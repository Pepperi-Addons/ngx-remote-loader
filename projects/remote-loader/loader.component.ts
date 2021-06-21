import { Component, Input, OnChanges, ViewChild, ViewContainerRef, ComponentFactoryResolver,
  Injector, NgModuleFactory, Compiler, EventEmitter, Output, ComponentRef, SimpleChanges, NgZone,
  ɵcreateInjector as createInjector,
  ɵrenderComponent as renderComponent ,
  ɵmarkDirty as markDirty,
  ɵLifecycleHooksFeature,
  ModuleWithComponentFactories} from '@angular/core';
import { loadRemoteModule, LoadRemoteModuleOptions } from '@angular-architects/module-federation';
import { RemoteModuleOptions } from './loader.model';
import { LifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';

@Component({
    selector: 'addon-proxy',
    template: `
        <ng-container #placeHolder></ng-container>
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
      private zone: NgZone
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
          const module =  await loadRemoteModule(hostObject).then(m => m);
          let moduleFactory: ModuleWithComponentFactories<any>;
          moduleFactory = this.compiler.compileModuleAndAllComponentsSync(module[hostObject.exposedModule.replace('./','')]);
          const moduleRef = moduleFactory.ngModuleFactory.create(this.injector);
          // const factory = moduleRef.componentFactoryResolver.resolveComponentFactory(module[hostObject.componentName]);
          const factory = moduleFactory.componentFactories[0];
          this.compRef = this.viewContainer.createComponent(factory, null, moduleRef.injector, null, moduleRef);
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

