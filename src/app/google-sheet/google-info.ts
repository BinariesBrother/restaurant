import {Sheet, GenericRow} from './google-sheet.service';

export class GoogleInfo{
    sheets: Map<string,Sheet>;
    backgroundColor:string;
    titre:string;
    description: string;
    pages:number;

    constructor(sheet:Sheet){
        this.sheets = new Map();
        sheet.rows.forEach(row=>{
            this.affectAttribute(row);
        });
    }

    affectAttribute(row:GenericRow){
        let value: string = row.attributes.get("valeur").toString();
        switch(row.attributes.get("attribut")){
            case "Titre":
                this.titre = value;
                break;
            case "Couleur de fond":
                this.backgroundColor = value;
                break;
            case "Pages":
                this.pages = parseInt(value);
                break;
            case "Description":
                this.description = value;
                break;
        }
    }
}