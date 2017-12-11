import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import {ActivatedRoute} from '@angular/router';
import { Page } from '../page/page';
import { PageComponent } from '../page/page.component';
import { Subject } from 'rxjs/Subject';

const ms = "400ms";

@Component({
  selector: 'feuille',
  templateUrl: './feuille.component.html',
  styleUrls: ['./feuille.component.css'],
  animations: [
    trigger('turn', [
      state('recto', style({transform: 'perspective(1750px) rotateY(90deg)'})),
      state('verso', style({transform: 'rotateY(0deg)'})),
      transition('recto => verso', animate(ms+' '+ms+' linear')),
      transition('verso => recto', animate(ms+' linear'))
    ]),
    trigger('turn-verso', [
      state('recto', style({transform: 'perspective(1750px) rotateY(-90deg)', })),
      state('verso', style({transform: 'rotateY(0deg)'})),
      transition('recto => verso', animate(ms+' '+ms+' linear')),
      transition('verso => recto', animate(ms+' linear'))
    ])
  ]
})
export class FeuilleComponent implements OnInit {


  @Input() feuille: Feuille;
  @Input() start: Function;
  @Input() end: Function;
  @Input() pageHandler: Subject<number>;
  @Input() previousPage: Function;
  @Input() nextPage: Function;

  recto: boolean;
  _route:ActivatedRoute;

  constructor(route: ActivatedRoute) {
    this._route = route;
   }

   begun(){
     this.start();
   }

   done(){
     this.end();
   }

  ngOnInit() {
    this.pageHandler.subscribe(param=>{
      if(typeof param !== 'undefined'){
        this.begun();
        this.recto = this.feuille.recto.params.get("index") >= (+param);
      }
    });
  }

}

export class Feuille{
  recto:Page;
  verso:Page;
  zindex:String;
}
