import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import {QimpService} from './../qimp/qimp.service'
import { Observable } from 'rxjs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {
    results: any;
    image: string;

    constructor(private qimpService: QimpService){}

    getImage(){
      this.qimpService.getImages().subscribe((response) => {
        console.log(response);
        this.results = response;
      });
    }
  
}
