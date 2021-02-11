import { LoadRemoteModuleOptions } from '@angular-architects/module-federation';


export type AddonOptions = LoadRemoteModuleOptions & {
    displayName: string;
    componentName: string;
    useModule?: boolean;
    uuid?: string;
    path?: string;
};
