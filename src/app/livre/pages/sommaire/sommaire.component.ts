import { Component, OnInit, Input } from '@angular/core';
import { Page } from '../page/page';

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
  constructor(index){
      let m = new Map();
      m.set("index",index);
      super("sommaire",m);
  }
}
