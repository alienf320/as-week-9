import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../interfaces/Product';
import { ProductsResponse } from '../interfaces/productsResponse';

interface responseProducts {
  data: Product[],
  meta: {}
}

@Injectable({
  providedIn: "root"
})

export class ProductsAPIService {

  url = 'https://trainee-program-api.applaudostudios.com/api/v1/products'
  urlLikes = 'https://trainee-program-api.applaudostudios.com/api/v1/likes'

  constructor(private http: HttpClient) { }

  getProducts(): Observable<responseProducts> {
    return this.http.get<responseProducts>(this.url)
      // .pipe(map(data => data.data))
  }

  giveLike(id: string, action: string) {
    console.log('se supone que di like')
    return this.http.post(this.urlLikes, {"data": {"product_id": id, "kind": action}})
  }
}
