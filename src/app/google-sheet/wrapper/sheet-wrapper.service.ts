import { Injectable } from '@angular/core';
import { GoogleInfo } from '../google-info';
import { Page } from '../../livre/pages/page/page';
import { Sommaire } from '../../livre/pages/sommaire/sommaire.component';
import { GoogleSheetService } from '../google-sheet.service';

@Injectable()
export class SheetWrapperService {
  api:GoogleSheetService;
  constructor(api:GoogleSheetService) {
    this.api = api;
  }

  getPages(): Promise<Array<Page>>{
    return this.api.getInfo().then(info=>this.wrap(info));
  }

  wrap(info:GoogleInfo):Array<Page>{
    return null;
  }

}
