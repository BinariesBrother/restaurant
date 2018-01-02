import { Component, OnInit, Input } from '@angular/core';
import { Page } from '../page/page';
import { GoogleInfo } from '../../../google-sheet/google-info';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  @Input() page: Menu;

  constructor() { }

  ngOnInit() {
  }

}

export class Menu extends Page{
  
  titre:string;
  entrees:Array<Plat>;
  plats:Array<Plat>;
  desserts:Array<Plat>;
  prix:number;
  description:string;

  constructor(component:any,index: number, info: GoogleInfo, titre:string, entrees:Array<Plat>, plats:Array<Plat>, desserts:Array<Plat>, prix:number, description:string){
    super("menu", index, info, component);
    this.titre = titre;
    this.entrees = entrees;
    this.plats = plats;
    this.desserts = desserts;
    this.prix = prix;
    this.description = description;
  }

}

export class Plat{
  identifiant:number;
  nom:string;
  prix:number;
  type:string;
  description:string;
}
