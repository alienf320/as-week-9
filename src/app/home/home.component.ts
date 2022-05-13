import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserAPIService } from '../services/user-api.service';
import { HomeActions } from './home-types';
import { ProductsState } from './reducers/home.reducers';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  user!: any;
  
  constructor(private userInfo: UserAPIService, private store: Store<ProductsState>) {}

  ngOnInit(): void {
    this.store.dispatch(HomeActions.getProducts())
    // this.userInfo.getUserInfo();
    // this.user = this.store.pipe( select( state => state['user'] ) )
  }
}


