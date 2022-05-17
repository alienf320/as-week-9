import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import { Product } from 'src/app/interfaces/Product';
import { AppState } from 'src/app/shared/appState.interface';
import { HomeActions } from '../home-types';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  products!: Observable<Product[]>;
  subs!: Subscription;

  constructor(
    private store: Store<AppState>, 
    private snackbar: MatSnackBar,
    private routeActive: ActivatedRoute ) { }
  
  ngOnInit(): void {    
    this.loadAllProducts();
  }
  
  loadAllProducts() {
    this.products = this.store.pipe( 
      select( state => state.home.home.products.filter( p => p.slug === this.routeActive.snapshot.paramMap.get('slug')) ), 
    )
  }

  like(id: string) {
    this.store.dispatch(HomeActions.like({id, action: "up"}))
  }

  dislike(id: string) {
    this.store.dispatch(HomeActions.dislike({id, action: "down"}))
  }

  buy(product: Product) {
    this.store.dispatch(HomeActions.buyItem({product}))
  }

  openSnackBar(product: Product) {
    this.snackbar.open(`${product.name} has been added to your shopping cart`, '' ,{ duration: 2000, panelClass: ['snack-light']});
  }

}
