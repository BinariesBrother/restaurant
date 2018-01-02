import { Component, OnInit, Input } from '@angular/core';
import { Page } from '../page/page';
import { GoogleInfo } from '../../../google-sheet/google-info';

@Component({
  selector: 'sommaire',
  templateUrl: './sommaire.component.html',
  styleUrls: ['./sommaire.component.css']
})
export class SommaireComponent implements OnInit {


  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}


export class Sommaire extends Page{
  constructor(component:any, index:number, infos: GoogleInfo){
      let m = new Map();
      m.set("index",index);
      super("sommaire", index, infos, component);
  }
}
