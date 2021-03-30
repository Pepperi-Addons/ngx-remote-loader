import { TranslateLoader, TranslateService, TranslateStore } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, InjectionToken, Input, NgZone, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
// import { PepAddonService, PepFileService } from '@pepperi-addons/ngx-lib';
import { PepMenuItem } from '@pepperi-addons/ngx-lib/menu';
import { MAT_MENU_SCROLL_STRATEGY } from '@angular/material/menu';
import { Overlay, BlockScrollStrategy , ScrollStrategy } from '@angular/cdk/overlay';
import { UploadComponent } from './../upload.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PepUIModule } from '../modules/pepperi.module';
import { MaterialModule } from '../modules/material.module';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';
import {
    PepNgxLibModule,
    PepAddonService,
    PepCustomizationService,
    PepFileService,
    FIELD_TYPE,
    ObjectSingleData,
    PepFieldData,
    PepRowData,
    PepHttpService,
    PepDataConvertorService,
} from '@pepperi-addons/ngx-lib';
import { PepAttachmentModule } from '@pepperi-addons/ngx-lib/attachment';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';
import { PepCarouselModule } from '@pepperi-addons/ngx-lib/carousel';
import { PepCheckboxModule } from '@pepperi-addons/ngx-lib/checkbox';
import { PepColorModule } from '@pepperi-addons/ngx-lib/color';
import { PepDateModule } from '@pepperi-addons/ngx-lib/date';
import { PepGroupButtonsModule } from '@pepperi-addons/ngx-lib/group-buttons';
import { PepImageModule } from '@pepperi-addons/ngx-lib/image';
import { PepImagesFilmstripModule } from '@pepperi-addons/ngx-lib/images-filmstrip';
import { PepQuantitySelectorModule } from '@pepperi-addons/ngx-lib/quantity-selector';
import { PepRichHtmlTextareaModule } from '@pepperi-addons/ngx-lib/rich-html-textarea';
import { PepSearchModule } from '@pepperi-addons/ngx-lib/search';
import { PepSelectModule } from '@pepperi-addons/ngx-lib/select';
import { PepSeparatorModule } from '@pepperi-addons/ngx-lib/separator';
import { PepSideBarModule } from '@pepperi-addons/ngx-lib/side-bar';
import { PepSignatureModule } from '@pepperi-addons/ngx-lib/signature';
import { PepSizeDetectorModule } from '@pepperi-addons/ngx-lib/size-detector';
import { PepTextareaModule } from '@pepperi-addons/ngx-lib/textarea';
import { PepTextboxModule } from '@pepperi-addons/ngx-lib/textbox';
import { PepListComponent, PepListModule } from '@pepperi-addons/ngx-lib/list';
import { PepMenuModule } from '@pepperi-addons/ngx-lib/menu';
import { PepTopBarModule } from '@pepperi-addons/ngx-lib/top-bar';

import { PepFormModule } from '@pepperi-addons/ngx-lib/form';
import {PortalModule} from '@angular/cdk/portal';
import { PepSmartFiltersModule } from '@pepperi-addons/ngx-lib/smart-filters';

import {
    PepIconModule,
    PepIconRegistry,
    pepIconSystemBolt,
    pepIconNoImage,
    pepIconArrowTwoWaysVerT,
    pepIconArrowDown,
    pepIconArrowUp,
    pepIconArrowRightAlt,
    pepIconArrowLeftAlt,
    pepIconArrowDownAlt,
    pepIconArrowUpAlt,
    pepIconNumberNumber,
    pepIconNumberPlus,
    pepIconSystemBin,
    pepIconSystemEdit,
    pepIconSystemClose,
    pepIconSystemFilter,
    pepIconSystemMenu,
    pepIconSystemHome,
    pepIconSystemSettings,
    pepIconSystemQuestion,
    pepIconSystemAvatar,
    pepIconSystemDoor,
    pepIconSystemPrint,
    pepIconSystemSearch,
    pepIconSystemSpinner,
    pepIconSystemInfo,
    pepIconShoppingCart,
    pepIconTimeCal,
    pepIconViewCardLg,
    pepIconViewCardMd,
    pepIconViewCardSm,
    pepIconViewTable,
    pepIconViewMatrix,
    pepIconViewLine
} from '@pepperi-addons/ngx-lib/icon';
const pepIcons = [
    pepIconSystemBolt,
    pepIconNoImage,
    pepIconArrowTwoWaysVerT,
    pepIconArrowDown,
    pepIconArrowUp,
    pepIconArrowRightAlt,
    pepIconArrowLeftAlt,
    pepIconArrowDownAlt,
    pepIconArrowUpAlt,
    pepIconNumberNumber,
    pepIconNumberPlus,
    pepIconSystemBin,
    pepIconSystemEdit,
    pepIconSystemClose,
    pepIconSystemFilter,
    pepIconSystemMenu,
    pepIconSystemHome,
    pepIconSystemSettings,
    pepIconSystemQuestion,
    pepIconSystemAvatar,
    pepIconSystemDoor,
    pepIconSystemPrint,
    pepIconSystemSearch,
    pepIconSystemSpinner,
    pepIconSystemInfo,
    pepIconShoppingCart,
    pepIconTimeCal,
    pepIconViewCardLg,
    pepIconViewCardMd,
    pepIconViewCardSm,
    pepIconViewTable,
    pepIconViewMatrix,
    pepIconViewLine,
];

const pepperiComponentsModules = [
    PepAttachmentModule,
    PepCarouselModule,
    PepButtonModule,
    PepCheckboxModule,
    PepColorModule,
    PepDateModule,
    PepGroupButtonsModule,
    PepImageModule,
    PepImagesFilmstripModule,
    PepListModule,
    PepCheckboxModule,
    PepQuantitySelectorModule,
    PepRichHtmlTextareaModule,
    PepSearchModule,
    PepSelectModule,
    PepSeparatorModule,
    PepSideBarModule,
    PepSignatureModule,
    PepSizeDetectorModule,
    PepTextareaModule,
    PepTextboxModule,
    PepIconModule,
    PepMenuModule,
    PepTopBarModule,
    PepSmartFiltersModule,
    PepFormModule
];

import {
    TranslateModule,
    // TranslateLoader,
    // TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PepDialogService } from '@pepperi-addons/ngx-lib/dialog';
// import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

@Component({
  selector: 'mfe1-download',
  template: `

    <!-- <div class="addon-page-container">
      <pep-top-bar [title]="'inline top bar'" [inline]="false">
            <div header-end-content>
                <button class="pep-button weak sm spacing-element">
                    button
                </button>
                <pep-button [value]="'test 1'" [sizeType]="'sm'" [styleType]="'regular'"
                    [classNames]="'spacing-element '"></pep-button>
                <pep-button [value]="'test 2'" [sizeType]="'sm'" [classNames]="'spacing-element '"
                    [iconName]="'system_settings'">
                </pep-button>
            </div>

      </pep-top-bar> -->
      <!-- <div class="main-content">
        <div class="content"> -->
        <!-- <div class="grid-container">
  <div class="left-side"> -->
  <pep-separator class="spacing-element" [key]="'sep1'"  [label]="'Sub-Addon separator'"></pep-separator>
      <pep-checkbox class="spacing-element" [key]="'cb1'"  (valueChange)="onValueChanged($event)"
              [label]="'Pepperi Checkbox'" [value]="'true'" [xAlignment]="'left'"
            >
            </pep-checkbox>
            <pep-textbox class="spacing-element" [key]="'int'" [label]="'Pepperi int'" [type]="'int'" [xAlignment]="'left'"
            (valueChange)="onValueChanged($event)"  [value]="'20302'" [required]="true">
            </pep-textbox>
            <pep-menu class="spacing-element pull-right flip" [xPosition]="'before'" [sizeType]="'md'" [styleType]="'weak'"
                            [items]="menuItems"
                           >
            </pep-menu>
            <pep-button class="spacing-element" [value]="'Pep Sub-Addon 1'"></pep-button>
            <pep-date class="spacing-element" [key]="'dateTime'" [label]="'Pepperi Date Time'" [type]="'datetime'"
                    [value]="'1-1-2020 12:00'" [xAlignment]="'left'" (valueChange)="onValueChanged($event)">
                </pep-date>
            <pep-quantity-selector class="spacing-element" [key]="'qs2'"
            [label]="'Pepperi Quantity Selector 1'" [type]="'button'"
                [value]="'55'" [xAlignment]="'left'">
            </pep-quantity-selector>
            <pep-attachment class="spacing-element" [key]="'attachment1'" [label]="'Pepperi Attachment'"
                            [xAlignment]="'center'" [rowSpan]="2" >
            </pep-attachment>
          <!-- </div>
  <div class="right-side">    -->
    <pep-signature class="spacing-element" [key]="'sig1'"
                          [src]="'https://i.ibb.co/VMHwLkm/58957776-8700-4c6a-b9bc-a171b84d8080.png'"
                          [label]="'Pepperi Signature'" [xAlignment]="'center'" [rowSpan]="4"
                          (valueChange)="onValueChanged($event)">
            </pep-signature>
            <pep-image class="spacing-element" [key]="'Image'" [label]="'Pepperi Image'"
                       [xAlignment]="'center'" [rowSpan]="1" [disabled]="true"
                       [src]="'https://idpfiles.sandbox.pepperi.com/f389fd2e-4a31-4965-a21e-3a98b4553300/images/logo.svg'"
                       (valueChange)="onValueChanged($event)" >
            </pep-image>
            <pep-rich-html-textarea class="spacing-element"  [key]="'richText1'" [label]="'Pepperi Rich Html Textarea'" [value]="'<div><b>rich text</b> html area</div>'"
                   [rowSpan]="3" [maxFieldCharacters]="300" [xAlignment]="'left'" [disabled]="false">
            </pep-rich-html-textarea>
            <!-- <pep-images-filmstrip [objectId]="'Images Filmstrip'" [key]="'Images Filmstrip 2'"
                   [xAlignment]="'center'" [label]="'Pepperi Images Filmstrip 1'" [showTitle]="true" [rowSpan]="7"
                   [value]="'https://idpfiles.sandbox.pepperi.com/f389fd2e-4a31-4965-a21e-3a98b4553300/images/left-side-background.jpg;https://idpfiles.sandbox.pepperi.com/f389fd2e-4a31-4965-a21e-3a98b4553300/images/logo.svg'"
                   (elementClicked)="elementClicked($event)">
            </pep-images-filmstrip> -->


          <!-- </div>

  <div class="footer"> -->
  <div class="list-container" #listContainer>
              <pep-list
                  [firstFieldAsLink]="false"
                  [isReport]="true"
                  [supportSorting]="true"
                  [supportResizing]="false"
                  [selectionTypeForActions]="'single'"
                  [noDataFoundMsg]="'No data'">
              </pep-list>
            </div>
  <!-- </div> -->
<!-- </div> -->




          <!-- </div>
        </div> -->
      <!-- </div> -->


  `,
  styles: [`img { max-width: 400px;}`, '::ng-deep.mat-menu-panel {}',
  // `.grid-container {
  //   display: grid;
  //   grid-template-columns: 1fr 1fr 1fr 1fr;
  //   grid-template-rows: 1fr 1fr 1fr;
  //   gap: 0px 0px;
  //   grid-template-areas:
  //     "left-side left-side right-side right-side"
  //     "footer footer footer footer"
  //     "footer footer footer footer";
  // }

  // .left-side { grid-area: left-side; }

  // .right-side { grid-area: right-side; }

  // .footer { grid-area: footer; }

  // `
  ],
  encapsulation: ViewEncapsulation.None


})

export class DownloadComponent implements OnInit {
  @Input() dataSource = null;
  @Input() displayedColumns = ['Name', 'Description'];
  @Input() customizeTable = null;
  transactionTypes;
  totalRows
  @ViewChild(PepListComponent) customList: PepListComponent;

  @Output() listChanged: EventEmitter<any> = new EventEmitter();
  @Output() sortingChanged: EventEmitter<any> = new EventEmitter();
  @Output() fieldClicked: EventEmitter<any> = new EventEmitter();
  @Output() selectedItemsChanged: EventEmitter<any> = new EventEmitter();
menuItems: Array<PepMenuItem>;
constructor(
  private translate: TranslateService,
  private http: PepHttpService,
  private dataConvertorService: PepDataConvertorService,
  private dialog: MatDialog,
  private ngZone: NgZone
) {

 }

  ngOnInit() {
    this.loadlist();
    this.menuItems = [
      { key: 'test1', text: 'test 1' },
      { key: 'test2', text: 'test 2', disabled: true },
      { key: 'sep', type: 'splitter' },
      { key: 'test3', text: 'test 3' },
  ];
   }

   ngOnChanges(changes: SimpleChanges) {
      if (changes?.dataSource?.currentValue){
      }
    }
    loadlist(change = { sortBy: 'Name', isAsc: true, searchString: ''}) {
      let url = `/types?fields=Name,Description,UUID,InternalID&order_by=${change.sortBy} ${change.isAsc ? 'asc' : 'desc'}&where=Type=2`;
      // const search = change?.searchString;
      // if (search){
      //     url = url + (` AND (Name like '%${search}%' OR Description like '%${search}%')`);
      //     this.showListActions = false;
      // }

      // this.http.postHttpCall('http://localhost:4401/api/transaction_types', {}).subscribe(res => res);
      // this.http.postPapiApiCall(`${this.addon_uuid}`, {}).subscribe(res => res);
      this.http.getPapiApiCall(encodeURI(url)).subscribe(
          (transactionTypes) => {
              this.displayedColumns = ['Name', 'Description'];
              this.transactionTypes = transactionTypes;
              this.totalRows = transactionTypes.length;
              this.initPepList(this.transactionTypes, this.displayedColumns, this.customizeTable);

          },
          (error) => {
              // console.log(error);
          },
          () => {
          }
  );
  }

     initPepList(dataSource, displayedColumns = null, customizeFn = null) {
      if (this.customList && dataSource) {
        const tableData = new Array<PepRowData>();
        dataSource.forEach((rowData: any) => {

            tableData.push(
                this.convertToPepRowData(rowData, displayedColumns)
            );
        });

        const uiControl = this.dataConvertorService.getUiControl(
            tableData[0]
        );
        const rows = this.dataConvertorService.convertListData(tableData);
        this.customList.initListData(
            uiControl,
            rows.length,
            rows,
            'table',
            '',
            true
        );
    }
     }


    convertToPepRowData(object: any, displayedColumns = null) {
      const row = new PepRowData();
      row.Fields = [];
      const keys = displayedColumns ? displayedColumns : Object.keys(object);
      keys.forEach((key) =>
          row.Fields.push(this.initDataRowField(object, key))
      );
      return row;
  }

  initDataRowField(object: any, key: any): PepFieldData {
      const dataRowField: PepFieldData = {
          ApiName: key,
          Title: this.translate.instant(key),
          XAlignment: 1,
          FormattedValue: object[key] ? object[key].toString() : '',
          Value: object[key] ? object[key].toString() : '',
          ColumnWidth: 10,
          AdditionalValue: '',
          OptionalValues: [],
          FieldType: FIELD_TYPE.TextBox,
      };

      switch (key) {
          case 'Description':
              dataRowField.ColumnWidth = 25;
              break;
          case 'Name':
              dataRowField.ColumnWidth = 15;
              break;
          case 'Type':
              dataRowField.ColumnWidth = 15;
              dataRowField.FieldType = FIELD_TYPE.ComboBox;
              dataRowField.OptionalValues = [
                  {
                      Key: 'UseExisting',
                      Value: 'Use Existing',
                  },
                  {
                      Key: 'OverwriteExisting',
                      Value: 'Overwrite Existing',
                  },
              ];
              break;
          default:
              dataRowField.FormattedValue = object[key]
                  ? object[key].toString()
                  : '';
              break;
      }

      return dataRowField;
  }

     getSelectedItemsData(){
      return this.customList.getSelectedItemsData();
     }

     getItemDataByID(id: string){
         return this.customList.getItemDataByID(id);
     }
     onValueChanged(e){
       console.log(e);
       if (this.dialog.openDialogs.length > 0) {
        // If dialogs are open, close the top one
        this.ngZone.run(() => {
          this.dialog.openDialogs[this.dialog.openDialogs.length - 1].close();
        });
      }
     }
     elementClicked(e){
       console.log(e);
     }

}



@NgModule({
  imports: [
    CommonModule,
    PepNgxLibModule,
        ReactiveFormsModule,
        FormsModule,
        PortalModule,
        MatMenuModule,
        pepperiComponentsModules,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient, PepFileService, PepAddonService],
            },
        }),
    MaterialModule,
    HttpClientModule
  ],
  exports: [
    // DownloadComponent,
    // UploadComponent
  ],
  declarations: [DownloadComponent]

})

export class DownloadModule {
  constructor(
    translate: TranslateService,
    private pepperiIconRegistry: PepIconRegistry
) {
    this.pepperiIconRegistry.registerIcons(pepIcons);
    let userLang = 'en';
    translate.setDefaultLang(userLang);
    userLang = translate.getBrowserLang().split('-')[0]; // use navigator lang if available
    if (location.href.indexOf('userLang=en') > -1) {
        userLang = 'en';
    }
    translate.use(userLang).subscribe((res: any) => {});
}
 }

 export function createTranslateLoader(
  http: HttpClient,
  fileService: PepFileService,
  addonService: PepAddonService
) {
  const addonStaticFolder = addonService.getAddonStaticFolder();
  const translationsPath: string = fileService.getAssetsTranslationsPath();
  const translationsSuffix: string = fileService.getAssetsTranslationsSuffix();

  return new MultiTranslateHttpLoader(http, [
      {
          prefix:
              addonStaticFolder.length > 0
                  ? addonStaticFolder
                  : translationsPath,
          suffix: translationsSuffix,
      },
      {
          prefix: addonStaticFolder.length > 0
          ? addonStaticFolder
          :'/assets/i18n/',
          suffix: '.json',
      },
  ]);
}




