import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MatCardModule } from '@angular/material/card';
import { ProductsComponent } from './products/products.component'; 
import { ProductsAPIService } from '../services/products-api.service';
import { StoreModule } from '@ngrx/store';
import { homeReducer, reducers } from './reducers/home.reducers';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './home.effects';
import { CartComponent } from './cart/cart.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatExpansionModule} from '@angular/material/expansion'; 
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ProductDetailComponent } from './product-detail/product-detail.component'; 

@NgModule({
  declarations: [
    ProductsComponent,
    CartComponent,
    ProductDetailComponent
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
    MatSnackBarModule,
    StoreModule.forFeature("home", reducers),
    EffectsModule.forFeature([HomeEffects])
  ],
  providers: [
    ProductsAPIService
  ]

})
export class HomeModule { }
