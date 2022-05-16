import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appResolver } from '../shared/app.resolver';
import { CartComponent } from './cart/cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: ProductsComponent, resolve: { home: appResolver }, },
  { path: 'mycart', component: CartComponent },
  { path: 'home/:slug', component: ProductDetailComponent, resolve: { home: appResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
