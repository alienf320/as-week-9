import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, Subscription, tap } from 'rxjs';
import { Category } from 'src/app/interfaces/Category';
import { Product } from 'src/app/interfaces/Product';
import { ProductsAPIService } from 'src/app/services/products-api.service';
import { AppState } from 'src/app/shared/appState.interface';
import { HomeActions } from '../home-types';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  products!: Observable<Product[]>;
  categories: Category[] = [];
  showCategories = false;
  subs!: Subscription;

  constructor(private store: Store<AppState>, private productsService: ProductsAPIService) { }
  
  ngOnInit(): void {    
    // this.store.dispatch(HomeActions.getProducts())
    this.loadAllProducts();
    this.subs = this.productsService.getCategories()
    .subscribe( resp => resp.data.forEach( elem => {
      console.log(elem)
      this.categories.push(elem); 
    }))
  }
  
  loadAllProducts() {
    this.products = this.store.pipe( 
      select( state => state.home.products ), 
      // tap( data => console.log(data)) 
    )
  }

  like(id: string) {
    console.log('id', id);
    this.store.dispatch(HomeActions.like({id, action: "up"}))
  }

  dislike(id: string) {
    this.store.dispatch(HomeActions.dislike({id, action: "down"}))
  }

  filterByName(name: string) {
    this.products = this.store.pipe( 
      select( state => state.home.products.filter(product => product.name.toLowerCase().match(name) ) ), 
      // tap( data => console.log(data)) 
    )
  }

  filter(slug: string) {
    // this.products = this.store.pipe( 
    //   select( state => state.home.products.filter(product => product.category == slug) ), 
    //   // tap( data => console.log(data)) 
    // this.products = this.productsService.getProductsByCategory(slug).subscribe()
    // )
  }

}
