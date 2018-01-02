import { iWrapper, TitrePage } from "../iWrapper";
import { GoogleInfo } from "../../google-info";
import { Page } from "../../../livre/pages/page/page";
import { Menu, Plat, MenuComponent } from "../../../livre/pages/menu/menu.component";
import { GenericRow } from "../../google-sheet.service";

export class MenuWrapper implements iWrapper{
    
    info:GoogleInfo;


    getInfo():GoogleInfo{
        return this.info;
    }

    constructor(info:GoogleInfo){
        this.info=info;
    }

    getPages():Array<Page>{
        return this.getMenus();
    }
    getTitles():Array<TitrePage>{
        return [];
    }

    getMenus():Array<Page>{
        let menus:Array<Page> = this.info.sheets["Menus"].rows.map(this.getMenu.bind(this));
        if(menus.length%2!==0){
            menus.push(new Menu(MenuComponent,1,null,null,null,null,null,null,null))
        }
        return menus;
    }

    getMenu(row:GenericRow):Menu{
        return new Menu(MenuComponent, 1, this.info, 
            row.attributes.get("nom").toString(),
            this.getPlatByIds(row.attributes.get("entrée")),this.getPlatByIds(row.attributes.get("plat")),this.getPlatByIds(row.attributes.get("dessert")),
            parseInt(row.attributes.get("prix").toString()),
            row.attributes.get("description").toString()
        )
    }

    getPlatByIds(id:String):Array<Plat>{
        let ids:Array<String> = id.split(',');
        return this.info.sheets["Plats"].rows.filter(row=>ids.indexOf(row.attributes.get("identifiant"))>-1).map(this.rowToPlat.bind(this));
        
    }

    rowToPlat(row:GenericRow):Plat{
        let plat:Plat = new Plat();
        plat.identifiant = 
            parseInt(row.attributes.get("identifiant").toString());
        plat.nom = row.attributes.get("nom").toString();
        plat.description = row.attributes.get("description").toString();
        plat.type = row.attributes.get("type").toString();
        plat.prix = parseInt(row.attributes.get("prix").toString());
        return plat;
    }
}