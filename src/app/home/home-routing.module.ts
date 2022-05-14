import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appResolver } from '../shared/app.resolver';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', redirectTo: 'home'},
  { path: 'home', component: ProductsComponent, resolve: { home: appResolver }, },
  { path: 'mycart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
