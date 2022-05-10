import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth-service.service';
import { PasswordValidators } from 'src/app/validators/passwordSecurity';


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnDestroy{

  form!: FormGroup;  
  subs!: Subscription;

  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router) { 
    this.form = fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', Validators.required ],
      passwordGroup: fb.group({
        password: ['', [Validators.required, Validators.minLength(8), PasswordValidators.securityLevel]],
        passwordConfirmation: ['', Validators.required]
      }, { validators: PasswordValidators.matchPasswords() }),
    })
  }
  
  get firstname() {
    return this.form.get('firstName')
  }
  get lastname() {
    return this.form.get('lastName')
  }
  get username() {
    return this.form.get('username')
  }
  get email() {
    return this.form.get('email')
  }
  get password() {
    return this.form.get('passwordGroup.password')
  }
  get passwordConfirmation() {
    return this.form.get('passwordGroup.passwordConfirmation')
  }

  onSubmit() {
    let user: User = {
      name: this.firstname!.value + ' ' + this.lastname!.value, 
      username: this.username!.value,
      email: this.email!.value, 
      password: this.password!.value, 
      passwordConfirmation: this.passwordConfirmation!.value 
    }

    this.subs = this.authService.singUp(user).subscribe( data => {
      if(data.hasOwnProperty('id')) {
        this.route.navigate(['/auth/login'])
      }
    })
  }

  ngOnDestroy(): void {
    if(this.subs)
      this.subs.unsubscribe();
  }
}