import { Component, Input, OnChanges, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector, Type, NgModuleFactory, Compiler, EventEmitter, Output, ComponentRef, EmbeddedViewRef } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { AddonOptions } from './loader.model';

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
    @Input() options: AddonOptions;
    @Output() change: EventEmitter<any> = new EventEmitter();

    constructor(
      private injector: Injector,
      private cfr: ComponentFactoryResolver,
      private compiler: Compiler
      ) { }

    async ngOnChanges() {
      this.loadAddon(this.options);
    }

    async loadAddon(options){
      this.viewContainer?.clear();

      // Load Module
      if (this.options?.useModule) {
        const module =  await loadRemoteModule(this.options).then(m => m);
        let moduleFactory: NgModuleFactory<any>;
        if (module[this.options.exposedModule.replace('./','')] instanceof NgModuleFactory) {
            moduleFactory = module[this.options.exposedModule.replace('./','')];
        } else {
            moduleFactory = this.compiler.compileModuleSync(module[this.options.exposedModule.replace('./','')]);
        }
        const moduleRef = moduleFactory.create(this.injector);
        const factory = moduleRef.componentFactoryResolver.resolveComponentFactory(module[this.options.componentName]);
        this.viewContainer.createComponent(factory, null, moduleRef.injector, null, moduleRef);
      }

      // Load Component
      else {
        const component = await loadRemoteModule(this.options).then(m => m[this.options.componentName]);
        const componentFactory = this.cfr.resolveComponentFactory(component);
        this.compRef = this.viewContainer.createComponent(componentFactory, null, this.injector);
      }
      // Send @Input() values
      this.compRef.instance['options'] = this.options;
      // Access the component template view
      (this.compRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      // Listen to @Output() events
      this.compRef?.instance['change']?.subscribe(e => this.change.emit(e));
    }

    ngOnDestroy(): void {
      this.viewContainer?.clear();
    }
}

