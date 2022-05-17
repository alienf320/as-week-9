import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Cart, CartResponse } from '../interfaces/cartResponse';

@Injectable({
  providedIn: 'root',
})

export class CartAPIService {

  url = 'https://trainee-program-api.applaudostudios.com/api/v1/cart';
  urlCart = 'https://trainee-program-api.applaudostudios.com/api/v1/cart';

  constructor(private http: HttpClient) {}
  
  getCart(): Observable<Cart> {
    return this.http.get<CartResponse>(this.urlCart).pipe(
      map((resp) => resp.data),
      // catchError((error) => throwError(() => 'No items in the cart'))
    );
  }

  addItem(id: number): Observable<Cart> {

    let bodyCartItem = {
      data: {
        items: [
          {
            product_variant_id: id,
            quantity: 1,
          },
        ],
      },
    };

    return this.http.put<CartResponse>(this.urlCart, bodyCartItem).pipe( 
      map( resp => {
        // if(resp.data) {
          console.log(resp.data)
          return resp.data
        // } else return resp.data}),
      })
      // catchError( error => {
      //   return throwError( () => new Error('mensaje de error'))})
      )
  }

  modifyCartItem(id: number, quantity: number, action: string, cartItemVariant: any): Observable<Cart> {
    let finalQuantity = 0;
    
    if(action === 'increase') {
      finalQuantity = quantity + 1;
    } else {
      finalQuantity = quantity -1;
    }

    let bodyCartItem = {
      data: {
        items: [
          {
            id: id,
            product_variant_id: cartItemVariant,
            quantity: finalQuantity,
          },
        ],
      },
    };

    return this.http.put<CartResponse>(this.urlCart, bodyCartItem).pipe( map( resp => resp.data))
  }

}
