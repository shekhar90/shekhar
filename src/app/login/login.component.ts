import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

import { UserLogin } from '../user-login';
// import { AuthenticationService } from '../shared/authentication.service';
import { AuthService } from '../shared/auth.service';
import { RoutingService } from '../shared/routing.service';
import { UtilityService } from '../shared/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() onSignupClick = new EventEmitter<boolean>();
  isLoginError = false;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    // public afService: AuthenticationService,
    private authService: AuthService,
    // private toastr: ToastrService,
    private routingService: RoutingService,
    private utilityService: UtilityService
  ) { }
  model = new UserLogin();
  ngOnInit() {
  }
  handleSignupClick() {
    this.onSignupClick.emit();
  }
  onLoginSubmit(loginForm: NgForm) {
    const user = {
      email: this.model.email,
      password: this.model.password
    };

    this.authService.authenticateUser(user).subscribe(data => {
        if (data.success) {
          console.log(data);
          this.isLoginError = false;
          this.resetForm(loginForm);
          this.authService.storeUserData(data.token, data.user);
          this.routingService.goto('/practice');
          // this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
          // this.router.navigate(['dashboard']);
        } else {
          console.log('error');
          // this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
          // this.router.navigate(['login']);
        }
    });
  }
  // handleLoginClick() { // post form data to backend
  //   this.httpClient.post('http://localhost:3000/login', this.model)
  //   .subscribe(data => {
  //     const res: any = data;
  //     if (res.status === 'error') { // Error in adding new user
  //       console.log(res.data);
  //     } else { // valid user added goto homepage
  //       console.log('go to home page');
  //       this.gotoPractice();
  //     }
  //   });
  // }
  // login(loginForm: NgForm) {
  //   this.afService.loginWithEmailPassword(loginForm.value.email, loginForm.value.password)
  //   .then(result => {
  //     this.isLoginError = false;
  //     this.resetForm(loginForm);
  //     this.routingService.goto('/practice');
  //     this.toastr.success('Logged in successfully', 'User');
  //   }).catch(error => {
  //     this.isLoginError = true;
  //     this.toastr.error('Error in logging in', error.message);
  //   });
  // }
  // loginWith(providerName: string) {
  //   this.afService.authenticateWith(providerName)
  //   .then(result => {
  //     this.toastr.success('Logged in successfully', 'User');
  //     this.routingService.goto('/practice');
  //   }).catch(error => {
  //     this.toastr.error('Error in logging in', error.message);
  //   });
  // }
  resetForm(loginForm?: NgForm) {
    if (loginForm != null) {
      loginForm.reset();
    }
    this.model = {
      email: '',
      password: ''
    };
  }
}
