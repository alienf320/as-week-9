import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of, tap} from 'rxjs';

import { UserAPIService } from 'src/app/services/user-api.service';
import { LoginActions } from '../login/login-types';
import { UserState } from '../login/reducers/login.reducers';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user!: Observable<UserState>;

  constructor(
    public auth: AuthService,
    public userInfo: UserAPIService, 
    private store: Store<UserState>) { }

  ngOnInit(): void {
    this.user = this.auth.loggedIn.value ? this.getUserFromLocalStorage() : this.store.pipe( 
      select( state => state.user ), 
       // tap( data => console.log(data))
    )
  }

  logOut() {
    this.store.dispatch(LoginActions.logout())    
  }

  getUserFromLocalStorage(): Observable<any> {
    return of(
      { 
        user: {
          ...JSON.parse(localStorage.getItem('user')!)
        }
      })
  } 

}
