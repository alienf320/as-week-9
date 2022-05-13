import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { map, noop, Subscription, tap } from 'rxjs';
import { UserAPIService } from 'src/app/services/user-api.service';
import { UserState } from '../reducers/login.reducers';
import { Store } from '@ngrx/store';
import { LoginActions } from '../login-types';
import { ServerResponseI } from 'src/app/interfaces/ServerResponse';
import { UserResponse } from 'src/app/interfaces/UserResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  form!: FormGroup;  
  subs!: Subscription;
  spinner = false;
  
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private route: Router, 
    private snackbar: MatSnackBar, 
    private userInfo: UserAPIService,
    private store: Store<UserState> ) { 
      this.form = this.fb.group({
        email: ['', Validators.required ],
        password: ['', [Validators.required ]]
      })
  }  
  
  get email() {
    return this.form.get('email')
  }
  get password() {
    return this.form.get('password')
  }

  logIn() {
    this.spinner = true;
    this.subs = this.authService.logIn(this.email!.value, this.password!.value)
    .pipe( 
      map( data => (data['data'] as ServerResponseI)),
      tap( data => {
        localStorage.setItem('token', data.token) ;
        let aux = {user: data.user}
        console.log('user', data.user);
        this.store.dispatch(LoginActions.loginResponse(aux))
        this.authService.loggedIn.next(true);
        this.route.navigate(['/home'])
          
        })
      )
      .subscribe( 
        noop, 
        () => {
          this.spinner = false
          this.openSnackBar()
        }, 
        () => this.spinner = false )
  }

  openSnackBar() {
    this.snackbar.open('Email or password are incorrect', '', { duration: 2000});
  }

  ngOnDestroy(): void {
    if(this.subs)
      this.subs.unsubscribe();
  }
}
