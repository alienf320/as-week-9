import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, map, Observable, switchMap, take, tap } from 'rxjs';
import { ServerResponseI } from '../interfaces/ServerResponse';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  
  constructor(private http: HttpClient) {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let token = localStorage.getItem('token')
    if(token) {
      const req = this.addToken(request, token)
      // console.log('req', req)
      
      return next.handle(req).pipe( tap(() => console.log(req)), catchError( (err: HttpErrorResponse) => {
          if(err.status === 401 && !this.isRefreshing) {
            this.isRefreshing = true;
            return this.http.post( "https://trainee-program-api.applaudostudios.com/api/v1/users/login", {"data": {"email": "trainee1@example.com", "password": "Trainee$1"}} )
            .pipe(
              map( resp => (resp as ServerResponseI)),
              switchMap( (res) => {
                localStorage.setItem('token', res.data.token);
                return next.handle( this.addToken(req, res.data.token))
              })
            )
          } else {
            return this.refreshTokenSubject.pipe(
              filter(token => token != null),
              take(1),
              switchMap(jwt => {
                return next.handle(this.addToken(request, jwt));
              }));
          }
        }));
    } 
    return next.handle(request)    
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })}
}
