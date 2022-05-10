import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserResponse } from '../interfaces/UserResponse';

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  userInfo = new BehaviorSubject<UserResponse>({});
  userInfo$ = this.userInfo.asObservable();

  constructor(private http: HttpClient) { }

  getUserInfo() {
    return this.http.get('http://sheltered-oasis-97086.herokuapp.com/auth/profile').subscribe(resp => this.userInfo.next(resp))
  }
}
