import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/interfaces/Product';
import { ProductsAPIService } from 'src/app/services/products-api.service';
import { UserAPIService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit, OnDestroy {

  products!: Product[];
  userInfo!: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private productService: ProductsAPIService, private userInfoService: UserAPIService) { }
  
  ngOnInit(): void {    
    this.productService.getProducts().pipe(takeUntil(this.destroy$)).subscribe( data => this.products = data.products )
    // this.userInfoService.getUserInfo().pipe(takeUntil(this.destroy$)).subscribe( data => this.userInfoService.userInfo.next(data) )
  }
  
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }  
}
