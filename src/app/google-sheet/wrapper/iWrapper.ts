import {Page} from '../../livre/pages/page/page';
import { GoogleInfo } from '../google-info';

export interface iWrapper{
    info:GoogleInfo;
    getPages():Array<Page>;
    getTitles():Array<TitrePage>;
}

export class TitrePage{
    titre:string;
    subTitles:Array<TitrePage>;
    page:Page;
    constructor(titre:string, page:Page, subTitles:Array<TitrePage>){
        this.titre=titre;
        this.page=page;
        this.subTitles = subTitles;
    }
}