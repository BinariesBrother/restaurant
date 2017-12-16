import { GoogleInfo } from "../../../google-sheet/google-info";

export class Page{
    type: String;
    index:number;
    niveau:number;
    zindex:String;
    info:GoogleInfo;

    params: Map<String, any>;

    constructor(type: String, map: Map<String, any>, googleInfo:GoogleInfo){
        this.type = type;
        this.params = map;
        this.info = googleInfo;
    }
}