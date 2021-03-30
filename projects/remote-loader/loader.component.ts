import { Component, Input, OnChanges, ViewChild, ViewContainerRef, ComponentFactoryResolver,
  Injector, NgModuleFactory, Compiler, EventEmitter, Output, ComponentRef, SimpleChanges, NgZone,
  ɵcreateInjector as createInjector,
  ɵrenderComponent as renderComponent ,
  ɵmarkDirty as markDirty,
  ɵLifecycleHooksFeature} from '@angular/core';
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
    @Input() options: RemoteModuleOptions;
    @Output() change: EventEmitter<any> =  new EventEmitter();

    constructor(
      private injector: Injector,
      private cfr: ComponentFactoryResolver,
      private compiler: Compiler,
      private zone: NgZone
      ) { }

    async ngOnChanges(changes: SimpleChanges) {
      if (changes?.options?.currentValue){
        this.loadAddon(changes?.options?.currentValue);

      }
    }

    async loadAddon(options: RemoteModuleOptions & LoadRemoteModuleOptions){
      const t0 = performance.now();
      // Check if only need update
      if (!options?.update){
        this.viewContainer?.clear();
        // Load Component
        if (options?.noModule) {
          const component = await loadRemoteModule(options).then(m => m[options.componentName]);
          const componentFactory = this.cfr.resolveComponentFactory(component);
          this.compRef = this.viewContainer.createComponent(componentFactory, null, this.injector);
        }
        // Load Module
        else {
          const module =  await loadRemoteModule(options).then(m => m);
          let moduleFactory: NgModuleFactory<any>;
          moduleFactory = this.compiler.compileModuleSync(module[options.exposedModule.replace('./','')]);
          const moduleRef = moduleFactory.create(this.injector);
          const factory = moduleRef.componentFactoryResolver.resolveComponentFactory(module[options.componentName]);
          this.compRef = this.viewContainer.createComponent(factory, null, moduleRef.injector, null, moduleRef);
          const t1 = performance.now();
          console.log('remote module load performance: ' + (t1-t0)/1000);

        }
      }
      if (this.compRef){

        // Send @Input() values
        // this.compRef.changeDetectorRef.markForCheck();
        this.compRef.instance.options = options;

        // Listen to @Output() events
          if (this.compRef?.instance?.ngOnChanges){
            this.compRef.instance.ngOnChanges(options);
          }
        this.compRef?.instance['change']?.subscribe(e => this.change.emit(e));
        // this.viewContainer.element.nativeElement.addEventListener('customEvent', () => {
        //   setTimeout(() => {

        //     console.log('Whoops we just triggered CD within the Angular Element.');
        //   });
        // });
      }


    }

    ngOnDestroy(): void {
      this.viewContainer?.clear();
    }
}

