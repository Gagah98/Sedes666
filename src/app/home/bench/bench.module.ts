import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BenchPageRoutingModule } from './bench-routing.module';

import { BenchPage } from './bench.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BenchPageRoutingModule
  ],
  declarations: [BenchPage]
})
export class BenchPageModule {}
