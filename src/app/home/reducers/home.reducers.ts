import { combineReducers, createReducer, on } from "@ngrx/store"
import { Cart, CartResponse } from "src/app/interfaces/cartResponse"
import { Product } from "src/app/interfaces/Product"
import { HomeActions } from "../home-types"

export interface ProductsState {
  products: Product[],
  categories: any,
  loaded: boolean
}

export const initialAuthState: ProductsState = {products: [], categories: null, loaded: false }

export const homeReducer = createReducer(
  initialAuthState,
  on(HomeActions.productsReceived,
    (state, {products}) => { 
      let aux = {products: products, loaded: true}
      return {...state, ...aux} 
    }
  ),
  on(HomeActions.like,
    (state, {id}) => { 
      let idx = state.products.findIndex( prod => prod.id == id );
      let aux = JSON.parse(JSON.stringify(state));
      aux.products[idx].likes_count = (+aux.products[idx].likes_count + 1) + '';
      return {...state, products: aux.products} 
    }),
  on(HomeActions.dislike,
    (state, {id}) => { 
      let idx = state.products.findIndex( prod => prod.id == id );
      let aux = JSON.parse(JSON.stringify(state));
      aux.products[idx].likes_count = (+aux.products[idx].likes_count - 1) + '';
      return {...state, products: aux.products} 
    }),
  on(HomeActions.likeFailed,
    (state, action) => {
      let idx = state.products.findIndex( prod => prod.id == action.id );
      let aux = JSON.parse(JSON.stringify(state));
      if(action.action == 'up') {
        aux.products[idx].likes_count = (+aux.products[idx].likes_count - 1) + '';
      } else {
        aux.products[idx].likes_count = (+aux.products[idx].likes_count + 1) + '';
      }
      return {...state, products: aux.products} 
    }
    )
)

//-----------------------------------------------------------------------

export interface ProductOfCart {
  product: Product,
  price: number,
  amount: number
}

export interface CartState {
  cart: Cart
}

export const initialCartState: CartState = { cart: {  
  id:           0,
  user_id:      0,
  number:       0,
  status:       '',
  total:        '',
  total_items:  '',
  completed_at: null,
  created_at:   new Date(),
  items:        [],
}}

export const cartReducer = createReducer(
  initialCartState,

  on(HomeActions.cartReceived,
    (state, {cart}) => { 
      return {...state, cart: cart}   
    }
  ),
)

export const reducers = combineReducers({
  home: homeReducer,
  cart: cartReducer
})