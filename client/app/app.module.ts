import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {CatalogComponent} from './components/catalog/catalog.component';
import {InnerComponent} from './components/inner/inner.component';

const appRoutes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'inner/:id', component: InnerComponent},
  { path: '**', component: CatalogComponent }
 ];


@NgModule({
  imports:      [
  BrowserModule, 
  FormsModule, 
  RouterModule.forRoot(appRoutes)
  
  ],
  declarations: [
  AppComponent,
  HeaderComponent,
  CatalogComponent,
  InnerComponent
  ], 
  bootstrap:    [AppComponent ]  
})

export class AppModule { } 
