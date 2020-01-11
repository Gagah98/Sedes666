import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./auth/auth.guard";
import { HomePage } from './home/home.page';
import { BenchPage } from './models/benchPage';
import { HomePageModule } from './home/home.module';
import { BenchPageModule } from './bench/bench.module';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  }, {
    path: "home",
    loadChildren: () => import ("./home/home.module").then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  }, {
    path: "map-bench",
    loadChildren: () => import ("./map-bench/map-bench.module").then(m => m.MapBenchPageModule)
  }, {
    path: "login",
    loadChildren: () => import ("./login/login.module").then(m => m.LoginPageModule)
  },
  {
    path: "bench",
    loadChildren: () => import ("./bench/bench.module").then(m => m.BenchPageModule)
  },
  {
    path: "add-bench",
    loadChildren: () => import ("./add-bench/add-bench.module").then(m => m.AddBenchPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },

  { path: '', redirectTo: 'bench', pathMatch: 'full' },
  { path: '', component: HomePageModule },
  { path: 'bench/:id', component: BenchPageModule }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
