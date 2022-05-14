import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take } from 'rxjs';

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
      
      return next.handle(req).pipe( catchError( (err: HttpErrorResponse) => {
          if(err.status === 401 && !this.isRefreshing) {
            this.isRefreshing = true;
            return this.http.post('http://sheltered-oasis-97086.herokuapp.com/auth/refresh', {}, {withCredentials: true}).pipe(
              switchMap( (res:any) => {
                localStorage.setItem('token', res.accessToken);
                this.refreshTokenSubject.next(res.accessToken)
                return next.handle( this.addToken(req, res.accessToken))
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
