import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Product } from 'src/app/interfaces/Product';
import { ProductsAPIService } from 'src/app/services/products-api.service';
import { UserAPIService } from 'src/app/services/user-api.service';
import { AppState } from 'src/app/shared/appState.interface';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit, OnDestroy {

  products!: Observable<Product[]>;
  test!: any;
  userInfo!: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private productService: ProductsAPIService, private userInfoService: UserAPIService, private store: Store<AppState>) { }
  
  ngOnInit(): void {    
    this.products = this.store.pipe( select( state => state.home.products ) )
    // this.products = this.store.pipe( select( selectProducts ))
    // this.productService.getProducts().pipe(takeUntil(this.destroy$)).subscribe( data => this.products = data )
    // this.userInfoService.getUserInfo().pipe(takeUntil(this.destroy$)).subscribe( data => this.userInfoService.userInfo.next(data) )
  }
  
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }  
}
