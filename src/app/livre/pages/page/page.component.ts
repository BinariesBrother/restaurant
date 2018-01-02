import { Component, OnInit, Input } from '@angular/core';
import {Page} from './page';
import {CouvertureComponent} from '../couverture/couverture.component';
import {SommaireComponent} from '../sommaire/sommaire.component';
import {MenuComponent} from '../menu/menu.component';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  @Input() page: Page;
  @Input() changePage: Function;
  @Input() recto: boolean;

  constructor() { }

  ngOnInit() {
  }

  change(){
    this.changePage();
  }

}
