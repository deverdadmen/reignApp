import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonToggleModule} from '@angular/material/button-toggle'; 

import { PrincipalComponent } from './pages/principal/principal.component';
import { AllComponent } from './pages/all/all.component';
import { FavesComponent } from './pages/faves/faves.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    PrincipalComponent,
    AllComponent,
    FavesComponent
  ],
  exports: [
    PrincipalComponent,
  ],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    AppRoutingModule,
    SharedModule,
    NgbPaginationModule,
    NgbDropdownModule
  ]
})
export class NewsModule { }
