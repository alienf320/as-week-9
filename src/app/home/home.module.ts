import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatCardModule } from '@angular/material/card';
import { ProductsComponent } from './products/products.component'; 
import { ProductsAPIService } from '../services/products-api.service';
import { StoreModule } from '@ngrx/store';
import { homeReducer } from './reducers/home.reducers';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './home.effects';

@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    StoreModule.forFeature("home", homeReducer),
    EffectsModule.forFeature([HomeEffects])
  ],
  providers: [
    ProductsAPIService
  ]

})
export class HomeModule { }
