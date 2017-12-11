import { Component, OnInit, Input } from '@angular/core';
import { Page } from "../page/page";

@Component({
  selector: 'couverture',
  templateUrl: './couverture.component.html',
  styleUrls: ['./couverture.component.css']
})
export class CouvertureComponent implements OnInit {

  @Input() entete: boolean;
  @Input() index: number;
  @Input() hide: boolean;

  constructor() { }

  ngOnInit() {
  }

}

export class Couverture extends Page{
    constructor(entete, index){
        let m = new Map();
        m.set("entete",entete);
        m.set("index",index);
        super("couverture",m);
    }
}
