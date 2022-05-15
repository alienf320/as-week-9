import { createReducer, on } from "@ngrx/store"
import { Product } from "src/app/interfaces/Product"
import { HomeActions } from "../home-types"

export interface CartState {
  products: Product[]
}

export const initialAuthState: CartState = {products: [] }

// export const cartReducer = createReducer(
//   initialAuthState,

//   on(HomeActions.getAllCartProducts,
//     (state, {products}) => { 
//       let aux = {products: products, loaded: true}
//       return {...state, ...aux} 
//     }
//   )

// )