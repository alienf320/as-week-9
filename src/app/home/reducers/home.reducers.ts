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
  )
)