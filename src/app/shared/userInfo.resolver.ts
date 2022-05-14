import { ActivatedRouteSnapshot, Resolve, Route, Router, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Resolver } from "dns";

export class UserInfoResolver implements Resolve<any> {
  
  constructor(private store: Store<any>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(
        select( state => state.user ), 
    )
  }

}