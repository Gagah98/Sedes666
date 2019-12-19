import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBenchPage } from './add-bench.page';

const routes: Routes = [
  {
    path: '',
    component: AddBenchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBenchPageRoutingModule {}
