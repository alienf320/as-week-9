import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/interfaces/cartResponse';
import { AppState } from 'src/app/shared/appState.interface';
import { HomeActions } from '../home-types';
import { selectAllCartProducts } from '../selectors/products.selectors';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products$!: Observable<CartItem[]> ;
  total$!: Observable<number>

  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {    
    this.store.dispatch( HomeActions.getAllCartProducts() )
    this.products$ = this.store.pipe( select( selectAllCartProducts ))
    this.total$ = this.store.pipe( select( state => +state.home.cart.cart.items.reduce( (acc, item) => acc + (+item.price * item.quantity), 0)))
  }
  
  changeAmount(id: number, quantity: number, action: string, productVariantId: number) {
    this.store.dispatch(HomeActions.sendItemChange({id, quantity, action, cartItemVariant: productVariantId})) 
  }
}
