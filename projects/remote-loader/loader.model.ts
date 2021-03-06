export type RemoteModuleOptions = {
  moduleData?: object;
  componentName: string;
  exposedModule?: string;
  remoteEntry?: string;
  remoteName?: string;
  update?: boolean;
  noModule?: boolean;
  title: string;
  visibleEndpoint?: string;
  multiSelection?: boolean | string ;
  confirmation?: boolean;
  type: string | string[];
  subType: string | string[];
  uuid: string;
}
