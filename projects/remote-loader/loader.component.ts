import { PepAddonService } from '@pepperi-addons/ngx-lib';
import { Component, Input, OnChanges, ViewChild, ViewContainerRef, ComponentFactoryResolver,
  Injector, NgModuleFactory, Compiler, EventEmitter, Output, ComponentRef, SimpleChanges, NgZone } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { PepRemoteLoaderOptions } from './loader.model';
declare var __webpack_public_path__;

@Component({
    selector: 'pep-remote-loader',
    template: `
        <!-- <mat-spinner *ngIf="showSpinner; else placeHolder"></mat-spinner> -->
        <ng-template #placeHolder></ng-template>
    `
})
export class PepAddonLoaderComponent implements OnChanges {
    @ViewChild('placeHolder', { read: ViewContainerRef, static: true }) viewContainer: ViewContainerRef;
    
    private _options: PepRemoteLoaderOptions = null;
    @Input()
    set options(value: PepRemoteLoaderOptions) {
        this._options = value;
        if (value) {
            this.loadAddon();
        }
    }
    get options(): PepRemoteLoaderOptions {
        return this._options;
    }
    
    // This is the data passed by the API Design documentation.
    private _hostObject: any = null;
    @Input()
    set hostObject(value: any) { 
        this._hostObject = value;
        this.setHostComponentIntoComponentRef();
    }
    get hostObject(): any {
        return this._hostObject;
    }

    @Output() hostEvents: EventEmitter<any> =  new EventEmitter();
    @Output() load: EventEmitter<any> =  new EventEmitter();
    // showSpinner = true;
    
    private compRef: ComponentRef<any>;

    constructor(
        private injector: Injector,
        private cfr: ComponentFactoryResolver,
        private compiler: Compiler,
        private zone: NgZone,
        private pepAddonService: PepAddonService,
    ) { }

    private setHostComponentIntoComponentRef() {
        if (this.hostObject && this.compRef?.instance) {
            this.compRef.instance.hostObject = this.hostObject;

            // TODO: Check if this is needed?? if not remove this.
            if (this.compRef?.instance?.ngOnChanges) {
                this.compRef.instance.ngOnChanges(this.hostObject);
            }
        }
    }

    async ngOnChanges(changes: SimpleChanges) {
        // if (changes?.options?.currentValue) {
        //     this.loadAddon(changes?.options?.currentValue);
        // }
    }

    private async loadAddon() {
        const t0 = performance.now();
        
        // Check if only need update
        if (!this.options?.update) {
            this.viewContainer?.clear();
            // Load Component
            if (this.options?.noModule) {
                const component = await loadRemoteModule(this.options).then(m => m[this.options.componentName]);
                const componentFactory = this.cfr.resolveComponentFactory(component);
                this.compRef = this.viewContainer.createComponent(componentFactory, null, this.injector);
            }
            // Load Module
            else {
                const publicPathArr = this.options.remoteEntry.split('/');
                const publicPath = publicPathArr.slice(0, publicPathArr.length - 1).join('/')+'/';
                __webpack_public_path__ = publicPath;
                this.pepAddonService.setAddonStaticFolder(publicPath, this.options.addonId);

                const module =  await loadRemoteModule(this.options).then(m => m);
                let moduleFactory: NgModuleFactory<any>;
                moduleFactory = this.compiler.compileModuleSync(module[this.options.exposedModule.replace('./','')]);
                const moduleRef = moduleFactory.create(this.injector);
                const componentFactory = moduleRef?.componentFactoryResolver?.resolveComponentFactory(module[this.options.componentName]);
                this.compRef = this.viewContainer.createComponent(componentFactory, null, this.injector, null, moduleRef);

                const t1 = performance.now();
                console.log('remote module load performance: ' + (t1-t0)/1000);
            }

            this.load.emit();
        }

        if (this.compRef) {
            this.setHostComponentIntoComponentRef();
            
            this.compRef?.instance['hostEvents']?.subscribe(e => {
                // switch(e.action){
                //     case 'addon-loaded':
                //         this.showSpinner = false;
                // }
                this.hostEvents.emit(e)
            });
            // this.viewContainer.element.nativeElement.addEventListener('customEvent', () => {
            //   setTimeout(() => {});});
        }
    }

    ngOnDestroy(): void {
        this.viewContainer?.clear();
    }
}

