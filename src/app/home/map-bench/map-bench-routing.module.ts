import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapBenchPage } from './map-bench.page';

const routes: Routes = [
  {
    path: '',
    component: MapBenchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapBenchPageRoutingModule {}
