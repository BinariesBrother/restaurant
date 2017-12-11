export class Page{
    type: String;
    index:number;
    niveau:number;
    zindex:String;

    params: Map<String, any>;

    constructor(type: String, map: Map<String, any>){
        this.type = type;
        this.params = map;
    }
}