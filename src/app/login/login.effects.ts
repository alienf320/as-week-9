import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { BehaviorSubject, catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../services/auth-service.service";
import { LoginActions } from "./login-types";

@Injectable()
export class LoginEffects {

  waitingResponse = new BehaviorSubject(false);
  waitingResponse$ = this.waitingResponse.asObservable();
  
  login$ = createEffect( () => 
    this.actions$.pipe(
    ofType(LoginActions.login),
    switchMap( (action) => {
      return this.auth.logIn(action.email, action.password).pipe(
        map( resp => LoginActions.loginResponse( {user: resp.data.user} )),
        catchError( () => {
          this.waitingResponse.next(false);
          return of(LoginActions.loginResponseError)})
      );
    }))
  );

  loginSuccess$ = createEffect( () => 
    this.actions$.pipe(
      ofType(LoginActions.loginResponse),
      tap( action => {
        this.waitingResponse.next(false);
        this.auth.loggedIn.next(true);
        this.router.navigate(['/home']);
        localStorage.setItem('user', JSON.stringify(action.user))} 
      )),
    {dispatch: false});

  logout$ = createEffect( () => 
    this.actions$.pipe(
      ofType(LoginActions.logout),
      tap( action => {
        this.auth.loggedIn.next(false);
      localStorage.setItem('token', '');
      this.router.navigate(['auth/login'])
      })
    ), {dispatch: false}
  );

  constructor(
    private actions$: Actions, 
    private auth: AuthService,
    private router: Router) { }

}