import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AcceuilComponent} from './acceuil/acceuil.component';
import {NotFoundComponent} from './not-found/not-found.component';


const appRoutes: Routes = [
    { path: 'page/:page', component: AcceuilComponent },
    { path: '', redirectTo: '/page/1', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
  ];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
