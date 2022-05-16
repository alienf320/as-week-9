import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class CartAPIService {

  url = 'https://trainee-program-api.applaudostudios.com/api/v1/cart';

  constructor(private http: HttpClient) {}

  getCart() {
    return this.http.get( this.url )
  }

  updateCart() {
    return this.http.post( this.url, this.createBody() );
  }

  createBody() {
    let body = {
      data: {
        user_id: 3,
        items: [
          {
            id: 300,
            product_variant_id: 32,
            quantity: 1,
          },
        ],
      },
    };
    return body;
  }
}
