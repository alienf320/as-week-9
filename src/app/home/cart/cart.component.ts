import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable, reduce, toArray } from 'rxjs';
import { Product } from 'src/app/interfaces/Product';
import { AppState } from 'src/app/shared/appState.interface';
import { HomeActions } from '../home-types';
import { ProductOfCart } from '../reducers/home.reducers';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products$!: Observable<ProductOfCart[]> ;
  total$!: Observable<number>

  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {    
    this.products$ = this.store.pipe( select( state => state.home.cart.products ))
    this.total$ = this.store.pipe( select( state => state.home.cart.products.reduce( (acc, elem) => acc + (+elem.price * +elem.amount), 0)))
  }
  
  increase(id: string) {
    this.store.dispatch(HomeActions.changeAmountItem({id, action:'increase'})) 
  }
  
  decrease(id: string) {
    this.store.dispatch(HomeActions.changeAmountItem({id, action:'decrease'}))
  }





}
