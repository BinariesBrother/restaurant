import { Component, OnInit, Input } from '@angular/core';
import { Page } from "../page/page";
import { GoogleInfo } from '../../../google-sheet/google-info';

@Component({
  selector: 'couverture',
  templateUrl: './couverture.component.html',
  styleUrls: ['./couverture.component.css']
})
export class CouvertureComponent implements OnInit {

  @Input() entete: boolean;
  @Input() index: number;
  @Input() hide: boolean;
  @Input() titre: string;
  @Input() description: string;

  constructor() { }

  ngOnInit() {
  }

}

export class Couverture extends Page{
    constructor(entete:boolean,empty:boolean, index, info:GoogleInfo){
        let m = new Map();
        m.set("entete",entete);
        m.set("index",index);
        m.set("empty",empty);
        super("couverture",m,info);
    }
}
