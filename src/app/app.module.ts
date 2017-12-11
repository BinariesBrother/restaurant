import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AcceuilComponent} from './acceuil/acceuil.component';
import {NotFoundComponent} from './not-found/not-found.component';
import { AppRoutingModule }     from './app-routing.module';

import { AppComponent } from './app.component';
import { LivreComponent } from './livre/livre.component';
import { CouvertureComponent } from './livre/pages/couverture/couverture.component';
import { PageComponent } from './livre/pages/page/page.component';
import { FeuilleComponent } from './livre/pages/feuille/feuille.component';
import { SommaireComponent } from './livre/pages/sommaire/sommaire.component';


@NgModule({ 
  declarations: [
    AppComponent,
    AcceuilComponent,
    NotFoundComponent,
    LivreComponent,
    CouvertureComponent,
    PageComponent,
    FeuilleComponent,
    SommaireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
