import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { first, tap } from "rxjs";
import { HomeActions } from "../home/home-types";
import { HomeEffects } from "../home/home.effects";
import { selectProductsLoaded } from "../home/selectors/products.selectors";
import { AppState } from "./appState.interface";

@Injectable({
  providedIn: "root"
})

export class appResolver implements Resolve<any> {

  constructor( private homeEffects: HomeEffects, private store: Store<AppState>) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(
      select(selectProductsLoaded),
      tap( loaded => {
        if(!loaded) {
          console.log('disparo el getProducts', loaded)
          this.store.dispatch(HomeActions.getProducts())          
        }
      }),
      first()
    )
  }
}