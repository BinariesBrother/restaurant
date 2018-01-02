import { iWrapper, TitrePage } from "../iWrapper";
import { GoogleInfo } from "../../google-info";
import { Page } from "../../../livre/pages/page/page";
import { Couverture, CouvertureComponent } from "../../../livre/pages/couverture/couverture.component";

export class CouvertureWrapper implements iWrapper{
    info:GoogleInfo;

    constructor(info:GoogleInfo){
        this.info=info;
    }

    getPages():Array<Page>{
        return [new Couverture(CouvertureComponent, true, false, 0, this.info),
        new Couverture(CouvertureComponent, true, true, 1, this.info),
        new Couverture(CouvertureComponent, false, true, 2, this.info),
        new Couverture(CouvertureComponent, false, false, 3, this.info)]
    }
    getTitles():Array<TitrePage>{
        return [];
    }
}