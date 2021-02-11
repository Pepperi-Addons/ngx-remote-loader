import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation } from '@angular/core';
import { PepHttpService} from '@pepperi-addons/ngx-lib';
import { ActivatedRoute } from '@angular/router';
import { iframesDic } from './dictionary';

@Component({
  selector: 'pep-settings-iframe',
  template: `
  <!-- <div id="settings-iframe-container">
                <iframe *ngIf="iframeCookieVersionSrc" style="display:none"
                        width="0px" height="0px"  [src]="iframeCookieVersionSrc | safe"></iframe>
                <iframe *ngIf="iframeSRC" class="embed-responsive-item" id="myFrame" #iframe
                [ngStyle]="{'min-height': 'calc(100vh - ' + data.top +'px)'}" width="100%" [src]="iframeSRC | safe"></iframe>
             </div> -->
             <div><pep-textbox [key]="'Texbox'" [label]="'Pepperi Texbox'" [placeholder]="'place holder'"
                    [maxFieldCharacters]="15" [required]="true" [xAlignment]="'center'" [rowSpan]="2"
                    [value]="'Pepperi Textbox'" (valueChange)="onValueChanged($event)">
                </pep-textbox></div>`,
  styles: []
})
export class SettingsIframeComponent implements OnInit {

  iframeCookieVersionSrc = null;
  iframeSRC = null;

  @Input() data = { top: 70, userRole: 'Admin', addon: null,
                     user: null, queryParams: null, atd: null, tab: null};
  @Output() change: EventEmitter<any> = new EventEmitter();

  @HostListener('window:message', ['$event']) onPostMessage(event) {
    if (event?.data?.msgName === 'general-save' || event?.data[0]?.msgName === 'general-save'){
        this.change.emit(event.data);
    }
  }

  constructor(
    public http: PepHttpService
    , public routeParams: ActivatedRoute
    ) { }

    onValueChanged(e) {
      console.log(e);
    }

  ngOnInit() {
    // this.initIframe();
  }

  initIframe(){
    let newStudioURL = sessionStorage.getItem('NewStudioUrl');
      if (newStudioURL){
          this.changeIframeSrc(newStudioURL, this.data.tab);
      }
      else {
        this.http.getPapiApiCall('/configuration_fields?key=NewStudioUrl').toPromise().then( res => {
            newStudioURL =  res.Value;
            sessionStorage.setItem('NewStudioUrl', newStudioURL);
            this.setCookieIframe(newStudioURL);
            this.changeIframeSrc(newStudioURL, this.data.tab);
        });
      }
  }

  setCookieIframe(newStudioURL){
      this.iframeCookieVersionSrc = `${newStudioURL}/cookieVersion.html?ver=${this.data.addon.Version}`;
      return;

  }

  changeIframeSrc(newStudioURL, view){
    let path;
     if (this.data?.queryParams?.view && (this.data.userRole === 'Admin' || this.data.userRole === 'VARAdmin')){
        path = `${newStudioURL}/${iframesDic[view]}`;
     }
     else {
       path = `${newStudioURL}/${this.getIframePath(this.data.tab, this.data.atd)}`;
     }
      const signToadd = path.indexOf('?') > -1 ? '&' : '?';
      this.iframeSRC = path + signToadd + 'webAppIframe=true';
  }

  getIframePath(tabName, atd) {
    let URI = `Views/Agents/OrdersTypes.aspx?tranUUID=${atd.InternalID}&tabName=${tabName.toUpperCase()}`
    if (tabName === 'general'){
      URI += `&name=${atd.ExternalID}&description=${atd.Description}&icon_name=${atd.Icon}`;
    }
    return URI;
  }

}
