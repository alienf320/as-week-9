import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { BehaviorSubject, catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../services/auth-service.service";
import { ProductsAPIService } from "../services/products-api.service";
import { HomeActions } from "./home-types";

@Injectable()
export class HomeEffects {

  waitingResponse = new BehaviorSubject(false);
  waitingResponse$ = this.waitingResponse.asObservable();
  
  login$ = createEffect( () => 
    this.actions$.pipe(
    ofType(HomeActions.getProducts),
    switchMap( () => {
      return this.productsServices.getProducts().pipe(
        tap( action => console.log('effect getProducts', action.data)),
        map( resp => HomeActions.productsReceived( {products: resp.data} )),
        // catchError( () => {
        //   this.waitingResponse.next(false);
        //   return of(HomeActions.loginResponseError)})
      );
    }))
  );

  constructor(
    private actions$: Actions, 
    private auth: AuthService,
    private productsServices: ProductsAPIService,
    private router: Router) { }

}