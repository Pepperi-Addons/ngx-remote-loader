import {inject, InjectionToken, NgZone} from '@angular/core';
import {BroadcastService} from './broadcast.service';

export const PEP_BROADCAST_SERVICE = new InjectionToken<BroadcastService>('broadCastService', {
  factory: () => new BroadcastService('pepperi-broadcast-service', inject(NgZone))
});
