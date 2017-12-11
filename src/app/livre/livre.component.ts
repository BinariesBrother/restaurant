import { Component, OnInit, Input, HostListener } from '@angular/core';
import {Couverture} from './pages/couverture/couverture.component';
import { Page } from './pages/page/page';
import { Feuille, FeuilleComponent } from './pages/feuille/feuille.component';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Sommaire } from './pages/sommaire/sommaire.component';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.css']
})
export class LivreComponent implements OnInit {
  
  page: number;

  feuilles: Array<Feuille>;

  pageHandler: Subject<number>;

  nbPages: number;

  previousPage: number;

  nextPage: number;

  startWait: boolean;

  router:Router;
  
  constructor(route:ActivatedRoute, router:Router) {
    this.router = router;
    let pages = [
      new Couverture(true, false, 0),
      new Couverture(true, true, 1),
      new Sommaire(2),
      new Sommaire(3),
      new Couverture(false, true, 4),
      new Couverture(false, false, 5)
    ];
    this.startWait = false;
    this.pageHandler = new Subject();
    route.params.subscribe(param=>{
      if(typeof param.page !== 'undefined'){
        this.startWait = this.page > parseInt(param.page);
        this.page = parseInt(param.page);
        this.nextPage = this.page+2;
        this.previousPage = this.page-2;
        this.pageHandler.next(this.page);
      }
    });
    this.feuilles = this.transformToFeuilles(pages);
    this.nbPages = pages.length;
   }

   start($event){
    if(this.startWait){
      this.affectZindex();
    }
  }

  end($event){
    if(!this.startWait){
      this.affectZindex();
    }
  }

  affectZindex(){
    this.feuilles.forEach((element, index) => {
      element.recto.zindex = ""+(this.nbPages*2 - Math.abs(this.page - index*2));
      element.verso.zindex = ""+(this.nbPages*2 - Math.abs(this.page - index*2+1));
    });
  }

  previousPageFunction(){
    this.router.navigateByUrl("/page/"+Math.max(0,this.previousPage));
  }

  nextPageFunction(){
    this.router.navigateByUrl("/page/"+Math.min(this.nbPages,this.nextPage));
  }

  transformToFeuilles(pages: Array<Page>):Array<Feuille>{
    let feuilles: Array<Feuille> = [];
    let feuille : Feuille;
    pages.forEach((element, index) => {
      if(index%2==0){
        feuille = new Feuille();
        feuille.recto=element;
        feuilles.push(feuille);
      }else{
        feuille.verso = element;
      }
    });
    return feuilles;
  }

  ngOnInit() {
    setTimeout(p=>this.pageHandler.next(this.page));
  }

  abs(value){
    return Math.abs(value);
  }

  isOdd(index){
    return index % 2 === 0;
  }

  isOtherPage(index, isOdd){
    return this.page-1===index && !isOdd || this.page+1 === index && isOdd;
  }

  isBefore(index){
    let difference =  this.page - index;
    let odd = this.isOdd(index)?1:-1;
    return !this.isActive(index) && difference <= 2 +odd && difference >= -2 + odd;
  }

  isActive(index){
    return this.page === index || this.isOtherPage(index, this.isOdd(index));
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.nextPageFunction();
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.previousPageFunction();
    }
  }

}
