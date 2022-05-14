import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/appState.interface";

export class CategoriesResolver implements Resolve<any> {
  
  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    return this.store.pipe(
      
    )
  }

}