import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductsResponse } from '../interfaces/productsResponse';

@Injectable({
  providedIn: 'any'
})

export class ProductsAPIService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductsResponse> {
    return this.http.get('http://sheltered-oasis-97086.herokuapp.com/products?take=10&page=1').pipe(
      map( data => (data as ProductsResponse) )
    )
  }
}
