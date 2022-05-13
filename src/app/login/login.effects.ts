import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { tap } from "rxjs";
import { AuthService } from "../services/auth-service.service";
import { LoginActions } from "./login-types";

@Injectable()
export class LoginEffects {
  
  login$ = createEffect( () => 
    this.actions$.pipe(
      ofType(LoginActions.loginResponse),
      tap( action => 
        localStorage.setItem('user', JSON.stringify(action.user)) )),
    {dispatch: false});

  constructor(private actions$: Actions, private auth: AuthService) { }

}