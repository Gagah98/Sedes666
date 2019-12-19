import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddBenchPageRoutingModule } from './add-bench-routing.module';
import { AddBenchPage } from './add-bench.page';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { StarRatingModule } from 'ionic4-star-rating';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBenchPageRoutingModule,
    LeafletModule,
    StarRatingModule
  ],
  declarations: [AddBenchPage]
})
export class AddBenchPageModule {}
