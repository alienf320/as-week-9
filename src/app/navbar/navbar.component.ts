import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription, tap} from 'rxjs';
import { AuthService } from 'src/app/services/auth-service.service';
import { UserAPIService } from 'src/app/services/user-api.service';
import { userSelector } from '../home/selectors/home.selectors';
import { LoginActions } from '../login/login-types';
import { UserState } from '../login/reducers/login.reducers';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  suscr!: Subscription;
  user!: Observable<any>;
  prueba!: any;

  constructor(
    public  auth: AuthService, 
    public userInfo: UserAPIService, 
    private store: Store<UserState>) { }

  ngOnInit(): void {
    this.user = this.store.pipe( select( state => state.user ), tap( data => console.log(data)) )
  }

  logOut() {
    this.store.dispatch(LoginActions.logout())    
  }

}
