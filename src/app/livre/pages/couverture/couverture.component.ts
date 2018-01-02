import { Component, OnInit, Input } from '@angular/core';
import { Page } from "../page/page";
import { GoogleInfo } from '../../../google-sheet/google-info';

@Component({
  selector: 'couverture',
  templateUrl: './couverture.component.html',
  styleUrls: ['./couverture.component.css']
})
export class CouvertureComponent implements OnInit {

  @Input() page: Couverture;
  

  constructor() { }

  ngOnInit() {
  }

}

export class Couverture extends Page{
  entete:boolean;
  empty:boolean;
    constructor(component:any, entete:boolean,empty:boolean, index, info:GoogleInfo){
        super("couverture",index,info, component);
        this.entete = entete;
        this.empty = empty;
        this.index = index;
    }
}
