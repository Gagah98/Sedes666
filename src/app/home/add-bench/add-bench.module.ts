import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBenchPageRoutingModule } from './add-bench-routing.module';

import { AddBenchPage } from './add-bench.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBenchPageRoutingModule
  ],
  declarations: [AddBenchPage]
})
export class AddBenchPageModule {}
