import { createReducer, on } from "@ngrx/store"
import { Product } from "src/app/interfaces/Product"
import { UserResponse } from "src/app/interfaces/UserResponse"
import { HomeActions } from "../home-types"

export interface ProductsState {
  products: Product[];
}

export const initialAuthState: ProductsState = {products: [] }

export const homeReducer = createReducer(
  initialAuthState,
  on(HomeActions.productsReceived,
    (state, {products}) => { 
      return {...state, products: products} 
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
    })
)