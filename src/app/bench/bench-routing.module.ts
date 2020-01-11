import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BenchPage } from './bench.page';

const routes: Routes = [
  {
    path: ':id',
    component: BenchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BenchPageRoutingModule {}