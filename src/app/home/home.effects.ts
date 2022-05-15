import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { BehaviorSubject, catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../services/auth-service.service";
import { ProductsAPIService } from "../services/products-api.service";
import { HomeActions } from "./home-types";

@Injectable({
  providedIn: "root"
})
export class HomeEffects {

  ProductsLoaded = new BehaviorSubject(false);
  ProductsLoaded$ = this.ProductsLoaded.asObservable();
  
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
        console.log('catchError', id, word)
        return of(HomeActions.likeFailed({id, action: word}))
      }),
    )}, {dispatch: false}
  )

  productsResponse$ = createEffect( () =>
    this.actions$.pipe(
      ofType(HomeActions.productsFailed),

    ), {dispatch: false}
  )
      
  constructor(
    private actions$: Actions, 
    private auth: AuthService,
    private productsServices: ProductsAPIService,
    private router: Router) { }

}