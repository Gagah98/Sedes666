import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddBenchPageRoutingModule } from './add-bench-routing.module';
import { AddBenchPage } from './add-bench.page';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { StarRatingModule } from 'ionic4-star-rating';
import { NotInValidatorDirective } from '../validator/not-in.directive';
import { MinDirective } from '../validator/min.directive';
import { MaxDirective } from '../validator/max.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBenchPageRoutingModule,
    LeafletModule,
    StarRatingModule
  ],
  declarations: [AddBenchPage, NotInValidatorDirective, MinDirective, MaxDirective ]
})
export class AddBenchPageModule {
  

}