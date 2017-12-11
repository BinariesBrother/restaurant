import { Component, OnInit } from '@angular/core';
import {LivreComponent} from '../livre/livre.component';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {
  recto = true;
  constructor() { 
  }

  ngOnInit() {
  }

}
