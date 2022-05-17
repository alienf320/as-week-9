import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { camelCase, kebabCase, mapKeys } from "lodash";

@Injectable()
export class ToCamelCase implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          let camelCaseObject = event.body?.data
            .map( (item: any) => mapKeys( item, (v, k) => {
              let aux = camelCase(k);              
              aux = aux.replace('_', '');
              // console.log(k, aux)
              return k.replace('_', '')} ))
          const modEvent = event.clone({ body: camelCaseObject });
          
          return modEvent;
        }
          return event
      })
    );
  }

}