import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './news/pages/all/all.component';
import { FavesComponent } from './news/pages/faves/faves.component';

const routes: Routes = [
  {
    path: '',
    component:  AllComponent,
    pathMatch: 'full'
},
{
    path: 'all',
    component: AllComponent
},
{
    path: 'faves',
    component: FavesComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
