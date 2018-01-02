import { GoogleInfo } from "../../../google-sheet/google-info";

export class Page{
    type: String;
    index:number;
    niveau:number;
    zindex:String;
    info:GoogleInfo;
    component:any

    constructor(type: String, index:number, googleInfo:GoogleInfo, component:any){
        this.type = type;
        this.info = googleInfo;
        this.index = index;
        this.component = component;
    }
}