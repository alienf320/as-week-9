import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Product } from '../interfaces/Product';

interface responseProducts {
  data: Product[];
  meta: {};
}

interface CategoriesResponse {
  data: [
    {
      id: string;
      slug: string;
      name: string;
    }
  ];
}

@Injectable({
  providedIn: 'root',
})
export class ProductsAPIService {
  url =
    'https://trainee-program-api.applaudostudios.com/api/v1/products?include=master,category,image_attachment.blob';
  urlLikes = 'https://trainee-program-api.applaudostudios.com/api/v1/likes';
  urlCategories =
    'https://trainee-program-api.applaudostudios.com/api/v1/categories';
  

  constructor(private http: HttpClient) {}

  getProducts(): Observable<responseProducts> {
    return this.http.get<responseProducts>(this.url);
    // .pipe(map(data => data.data))
  }

  giveLike(id: string, action: string) {
    return this.http.post(this.urlLikes, {
      data: { product_id: id, kind: action },
    });
  }

  getCategories(): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(this.urlCategories);
  }

  getProductsByCategory(slug: string): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(
      `https://trainee-program-api.applaudostudios.com/api/v1/categories/${slug}`
    );
  }
}
