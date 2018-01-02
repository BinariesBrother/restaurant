import { Injectable } from '@angular/core';
import { GoogleInfo } from '../google-info';
import { Page } from '../../livre/pages/page/page';
import { Sommaire } from '../../livre/pages/sommaire/sommaire.component';
import { GoogleSheetService } from '../google-sheet.service';
import { Couverture } from '../../livre/pages/couverture/couverture.component';
import {CouvertureWrapper} from './wrappers/Couverture';
import {MenuWrapper} from './wrappers/Menus';
import { iWrapper } from './iWrapper';

@Injectable()
export class SheetWrapperService {
  api:GoogleSheetService;
  constructor(api:GoogleSheetService) {
    this.api = api;
  }

  getPages(): Promise<Array<Page>>{
    return this.api.getInfo().then(info=>this.wrap(info));
  }

  wrap(infos:GoogleInfo):Array<Page>{
    console.log(infos);
    let wrappers:Array<iWrapper>=[new MenuWrapper(infos)];
    let result:Array<Page>;
    let couvertureService: CouvertureWrapper = new CouvertureWrapper(infos);
    let couvertures:Array<Page>= couvertureService.getPages();
    let generatePages:Array<Page>= wrappers.map(wrapper=>wrapper.getPages()).reduce((a,b)=>a.concat(b),[]);
    result = [couvertures[0],couvertures[1]];
    result.push(...generatePages);
    result.push(couvertures[2],couvertures[3]);
    result.forEach((elem,index)=>elem.index=index);
    return result;
  }

}
