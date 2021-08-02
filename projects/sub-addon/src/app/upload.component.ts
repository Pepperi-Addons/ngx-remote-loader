import { Component, OnInit } from '@angular/core';
import { PepMenuItem } from '@pepperi-addons/ngx-lib/menu';

@Component({
    selector: 'mfe1-upload',
    template: `

      <div>Remote Component Works!</div>
       <!-- <pep-menu [title]="'Pep Menu'" class="pull-right flip" [xPosition]="'before'" [sizeType]="'md'" [styleType]="'weak'"
                    [items]="menuItems">

                </pep-menu> -->
                <div>aaa</div>
    `,
    styles: [`img { max-width: 100px;}`]
})

export class UploadComponent implements OnInit {
  menuItems: Array<PepMenuItem>;
  constructor() { }

    ngOnInit() {
      this.menuItems = [
        { key: 'test1', text: 'test 1' },
        { key: 'test2', text: 'test 2', disabled: true },
        { key: 'sep', type: 'splitter' },
        { key: 'test3', text: 'test 3' },
    ];
     }
}
