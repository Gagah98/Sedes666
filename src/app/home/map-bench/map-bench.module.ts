import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapBenchPageRoutingModule } from './map-bench-routing.module';

import { MapBenchPage } from './map-bench.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapBenchPageRoutingModule
  ],
  declarations: [MapBenchPage]
})
export class MapBenchPageModule {}
