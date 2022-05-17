import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { BehaviorSubject, catchError, exhaustMap, map, of, switchMap, tap, throwError } from "rxjs";
import { Cart } from "../interfaces/cartResponse";
import { CartAPIService } from "../services/cart-api.service";
import { ProductsAPIService } from "../services/products-api.service";
import { HomeActions } from "./home-types";

@Injectable({
  providedIn: "root"
})
export class HomeEffects {

  ProductsLoaded = new BehaviorSubject(false);
  ProductsLoaded$ = this.ProductsLoaded.asObservable();
  cartAux!: Cart;
  
  productsRequest$ = createEffect( () => 
    this.actions$.pipe(
    ofType(HomeActions.getProducts),
    switchMap( () => {
      return this.productsServices.getProducts().pipe(
        tap( action => {
          this.ProductsLoaded.next(true);
        }),
        map( resp => HomeActions.productsReceived( {products: resp.data} )),
        catchError( () => {
          return of(HomeActions.productsFailed)})
      );
    }))
  );
  
  like$ = createEffect( () => {
    let id: string;
    let word: string;
    return this.actions$.pipe(
      ofType(HomeActions.like || HomeActions.dislike),
      tap(action => {
        id = action.id;
        word = action.action
      }),
      switchMap( (action) => {
        return this.productsServices.giveLike(action.id, action.action)}
      ),
      catchError( (err) => {
        return of(HomeActions.likeFailed({id, action: word}))
      }),
    )}, {dispatch: false}
  );

  getAllCartProducts$ = createEffect( () =>
    this.actions$.pipe(
      ofType(HomeActions.getAllCartProducts),
      switchMap( (action) => {
        return this.cartServices.getCart().pipe(
          map( resp => HomeActions.cartReceived( {cart: resp} )),
        )
      })
    )
  );

  cartResponse$ = createEffect( () => {
    return this.actions$.pipe(
      ofType(HomeActions.buyItem),
      switchMap( (action) => {
        return this.cartServices.addItem(+action.product.id).pipe(
          map( resp => {
            return HomeActions.cartReceived( {cart: resp}  )
          }),
          catchError( error => {
            return of(HomeActions.errorBuyingItem( error )) 
          }),
        )
      })
    )
  }
  )

  cartErrorResponse$ = createEffect( () =>
    this.actions$.pipe(
      ofType(HomeActions.errorBuyingItem),
      tap( err => console.log('error', err))
    ), {dispatch: false})

  changeItemQuantity$ = createEffect( () =>
  this.actions$.pipe(
    ofType(HomeActions.sendItemChange),
    switchMap( (action) => {
      return this.cartServices.modifyCartItem(action.id, action.quantity, action.action, action.cartItemVariant).pipe(
        // tap( action => {
        //   this.ProductsLoaded.next(true);
        // }),
        map( resp => HomeActions.cartReceived( {cart: resp} )),
      )
    })
  )
)
      
  constructor(
    private actions$: Actions, 
    private productsServices: ProductsAPIService,
    private cartServices: CartAPIService) { }

}