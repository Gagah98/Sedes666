import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapBenchPageRoutingModule } from './map-bench-routing.module';

import { MapBenchPage } from './map-bench.page';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapBenchPageRoutingModule,
    LeafletModule    
  ],
  declarations: [MapBenchPage]
})
export class MapBenchPageModule {}
