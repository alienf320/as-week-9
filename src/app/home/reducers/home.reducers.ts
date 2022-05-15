import { combineReducers, createReducer, on } from "@ngrx/store"
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
  products: ProductOfCart[]
}

export const initialCartState: CartState = { products: [] }

export const cartReducer = createReducer(
  initialCartState,

  on(HomeActions.buyItem,
    (state, {product}) => { 
      let prod!: ProductOfCart;
      let arrOfProdCart!: ProductOfCart[];
      let price!: number;
      let oldProduct = state.products.find( p => p.product.name == product.name)
      let amount = oldProduct?.amount

      if(!amount) {
        console.log('entro porque no hay amount')
        price = randomPrice()
        amount = 1;
        arrOfProdCart = [...state.products]
      } else {
        amount++;
        price = oldProduct!.price;
        let idx = [...state.products].findIndex( p => p.product.name == product.name)
        arrOfProdCart = [...state.products]
        arrOfProdCart.splice(idx,1)
      }
      prod = {product, price, amount}
      arrOfProdCart.push(prod)
      // console.log('array despues del pucs', arrOfProdCart)
      
      return {...state, products: arrOfProdCart}   
    }
  ),
  on(HomeActions.changeAmountItem,
    (state, {id, action}) => { 
      let prod!: ProductOfCart;
      let arrOfProdCart!: any;
      let price!: number;
      let oldProduct = state.products.find( p => p.product.id == id) as ProductOfCart
      let amount = oldProduct!.amount

      if(action == 'increase') {
        amount++;
      } else if (amount !== 0) {
        amount--;
      }

      price = oldProduct!.price;
      let idx = [...state.products].findIndex( p => p.product.id == id)
      // console.log('idx', idx)
      arrOfProdCart = [...state.products]
      // console.log('array antes del splice', arrOfProdCart, idx)
      prod = {product: oldProduct.product, price, amount}
      arrOfProdCart.splice(idx,1,prod)
      // console.log('array despues del splice', arrOfProdCart, idx)

      // arrOfProdCart.push(prod)
      return {...state, products: arrOfProdCart}   
    }
  )

)

function randomPrice(): number {
  let min = 0;
  let max = 10;
  return +(Math.random() * (max - min + 1) + min).toFixed(2)
}

export const reducers = combineReducers({
  home: homeReducer,
  cart: cartReducer
})