import { LoadRemoteModuleOptions } from "@angular-architects/module-federation"

type PepRemoteLoaderData = {
    componentName: string;
    addonId: string;
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

export type PepRemoteLoaderOptions = LoadRemoteModuleOptions & PepRemoteLoaderData;
