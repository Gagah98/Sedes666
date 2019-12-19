import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'bench',
        loadChildren: () => import('./bench/bench.module').then( m => m.BenchPageModule)
      },
  
    ]
  },
  {
    path: 'home/add-bench',
    loadChildren: () => import('./add-bench/add-bench.module').then( m => m.AddBenchPageModule)
  },
  {
    path: 'map-bench',
    loadChildren: () => import('./map-bench/map-bench.module').then( m => m.MapBenchPageModule)
  },
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
