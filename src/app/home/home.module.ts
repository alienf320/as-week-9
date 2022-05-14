import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MatCardModule } from '@angular/material/card';
import { ProductsComponent } from './products/products.component'; 
import { ProductsAPIService } from '../services/products-api.service';
import { StoreModule } from '@ngrx/store';
import { homeReducer } from './reducers/home.reducers';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './home.effects';
import { CartComponent } from './cart/cart.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatExpansionModule} from '@angular/material/expansion'; 
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    ProductsComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatInputModule,
    StoreModule.forFeature("home", homeReducer),
    EffectsModule.forFeature([HomeEffects])
  ],
  providers: [
    ProductsAPIService
  ]

})
export class HomeModule { }
