import { createReducer, on } from "@ngrx/store"
import { Product } from "src/app/interfaces/Product"
import { HomeActions } from "../home-types"

export interface ProductsState {
  products: Product[],
  loaded: boolean
}

export const initialAuthState: ProductsState = {products: [], loaded: false }

export const homeReducer = createReducer(
  initialAuthState,
  on(HomeActions.productsReceived,
    (state, {products}) => { 
      let aux: ProductsState = {products: products, loaded: true}
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