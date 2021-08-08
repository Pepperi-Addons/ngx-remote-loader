export type RemoteModuleOptions = {
    // Those are LoadRemoteModuleOptions properties from '@angular-architects/module-federation';
    // **********************************************************************************************
    remoteEntry?: string;
    remoteName: string;
    exposedModule: string;
    // **********************************************************************************************
    moduleData?: object;
    componentName: string;
    title: string;
    visibleEndpoint?: string;
    multiSelection?: boolean | string ;
    confirmation?: boolean;
    // type: string | string[];
    // subType: string | string[];
    uuid: string;
    update?: boolean;
    noModule?: boolean;
    // [key:string]: any; If anyone will need it then add it!!!
}
