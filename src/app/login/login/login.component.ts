import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; 

import { UserState } from '../reducers/login.reducers';
import { Store } from '@ngrx/store';
import { LoginActions } from '../login-types';

import { LoginEffects } from '../login.effects';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form!: FormGroup;  
  spinner$ = this.loginEffects.waitingResponse$;
  
  constructor(
    private fb: FormBuilder, 
    private snackbar: MatSnackBar, 
    private store: Store<UserState>,
    private loginEffects: LoginEffects, ) { 
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
    this.loginEffects.waitingResponse.next(true)
    this.store.dispatch(LoginActions.login( {email: this.email!.value, password: this.password!.value} ))
  }

  openSnackBar() {
    this.snackbar.open('Email or password are incorrect', '', { duration: 2000});
  }

}
