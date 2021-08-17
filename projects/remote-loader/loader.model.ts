export type RemoteModuleOptions = {
    // Those are LoadRemoteModuleOptions properties from '@angular-architects/module-federation';
    // **********************************************************************************************
    remoteEntry?: string;
    remoteName: string;
    exposedModule: string;
    // **********************************************************************************************
    componentName: string;
    uuid: string;
    update?: boolean;
    noModule?: boolean;
    // title: string;
    // moduleData?: object;
    // visibleEndpoint?: string;
    // multiSelection?: boolean | string ;
    // confirmation?: boolean;
    // type: string | string[];
    // subType: string | string[];
    // [key:string]: any; // If anyone will need it then add it!!!
}
