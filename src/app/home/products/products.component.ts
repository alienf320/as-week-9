import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, tap } from 'rxjs';
import { Product } from 'src/app/interfaces/Product';
import { AppState } from 'src/app/shared/appState.interface';
import { HomeActions } from '../home-types';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  products!: Observable<Product[]>;

  constructor(private store: Store<AppState>) { }
  
  ngOnInit(): void {    
    this.store.dispatch(HomeActions.getProducts())
    this.products = this.store.pipe( 
      select( state => state.home.products ), 
      // tap( data => console.log(data)) 
    )
  }

  like(id: string) {
    console.log('id', id)
    this.store.dispatch(HomeActions.like({id, action: "up"}))
  }

  dislike(id: string) {
    this.store.dispatch(HomeActions.dislike({id, action: "down"}))
  }

}
