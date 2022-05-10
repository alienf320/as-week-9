import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatCardModule } from '@angular/material/card';
import { ProductsComponent } from './products/products.component'; 
import { ProductsAPIService } from '../services/products-api.service';

@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule
  ],
  providers: [
    ProductsAPIService
  ]

})
export class HomeModule { }
