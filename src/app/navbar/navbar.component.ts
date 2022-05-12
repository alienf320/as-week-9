import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { UserResponse } from 'src/app/interfaces/UserResponse';
import { AuthService } from 'src/app/services/auth-service.service';
import { UserAPIService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  suscr!: Subscription;
  user!: UserResponse;

  constructor(public  auth: AuthService, private router: Router, public userInfo: UserAPIService) { }

  ngOnInit(): void {
    this.suscr = this.userInfo.userInfo$.subscribe( resp => this.user = resp )    
  }

  logOut() {
    this.auth.loggedIn.next(false);
    localStorage.setItem('token', '');
    this.router.navigate(['auth/login'])
  }

}
