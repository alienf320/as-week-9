import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { catchError, Observable, Subscription, tap, take } from 'rxjs';
import { Cart, CartItem } from 'src/app/interfaces/cartResponse';
import { Category } from 'src/app/interfaces/Category';
import { Product } from 'src/app/interfaces/Product';
import { CartAPIService } from 'src/app/services/cart-api.service';
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
  currentItemToShow$!: Observable<Product[]>;
  showCategories = false;
  subs!: Subscription;
  actualPage!: PageEvent;
  cartItems!: Observable<CartItem[]>;

  constructor(
    private store: Store<AppState>, 
    private productsService: ProductsAPIService,
    private snackbar: MatSnackBar,
    private cartService: CartAPIService) { }
  
  ngOnInit(): void {        
    this.store.dispatch( HomeActions.getAllCartProducts() )
    this.onPageChange({pageIndex: 0, pageSize: 10, length: 100});
    this.subs = this.productsService.getCategories()
    .subscribe( resp => resp.data.forEach( elem => {
      this.categories.push(elem); 
    }))
    this.cartItems = this.store.select( store => store.home.cart.cart.items )
  }
  
  loadAllProducts() {
    this.products = this.store.pipe( 
      select( state => state.home.home.products
        .slice(this.actualPage.pageIndex * this.actualPage.pageSize, this.actualPage.pageIndex*this.actualPage.pageSize + this.actualPage.pageSize)  )
    )
  }

  onPageChange($event: PageEvent) {
    this.actualPage = $event;
    this.products =  this.store.pipe(
      select( state => state.home.home.products
        .slice($event.pageIndex * $event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize) 
      ),
      // tap( (p)=> console.log(p))
    )
  }

  like(id: string) {
    this.store.dispatch(HomeActions.like({id, action: "up"}))
  }

  dislike(id: string) {
    this.store.dispatch(HomeActions.dislike({id, action: "down"}))
  }

  filterByName(name: string) {
    this.products = this.store.pipe( 
      select( state => state.home.home.products
        .filter(product => product.name.toLowerCase().match(name) )
        .slice(this.actualPage.pageIndex * this.actualPage.pageSize, this.actualPage.pageIndex*this.actualPage.pageSize + this.actualPage.pageSize)
      ), 
      // tap( data => console.log(data)) 
    )
  }

  filter(slug: string) {
    this.products = this.store.pipe( 
      select( state => state.home.home.products
        .filter(product => product.category.slug == slug)
      )
    )
  }

  addToCart(product: Product) {
    this.cartItems.pipe(take(1)).subscribe( cartItem => {
      let aux = cartItem.filter( item => {
        return item.product_id == +product.id
      })
      if(aux[0]) {
        this.store.dispatch(HomeActions.sendItemChange({
          id: aux[0].id, 
          quantity: aux[0].quantity, 
          action: 'increase', 
          cartItemVariant: aux[0].product_variant_id
        }))
      } else {
        this.store.dispatch(HomeActions.buyItem({product}))
      }
    })
  }

  openSnackBar(product: Product) {
    this.snackbar.open(`${product.name} has been added to your shopping cart`, '' ,{ duration: 2000, panelClass: ['snack-light']});
  }

}
