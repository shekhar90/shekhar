import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { User } from '../user';
import { AuthenticationService } from '../shared/authentication.service';
import { UtilityService } from '../shared/utility.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @Output() onSigninClick = new EventEmitter<boolean>();
  constructor(
    private httpClient: HttpClient,
    public afService: AuthenticationService,
    private toastr: ToastrService,
    private utilityService: UtilityService) {
      afService.getData();
    }
  model = new User();
  ngOnInit() {
  }
  handleSigninClick() { // only for routing to signin page
    this.onSigninClick.emit();
  }
  // handleSignupClick() { // post form data to backend
  //   this.httpClient.post('http://localhost:3000/signup', this.model)
  //   .subscribe(data => {
  //     const res: any = data;
  //     if (res.status === 'error') { // Error in adding new user
  //       console.log(res.data);
  //     } else if (res.status === 'success' && res.data.msg === 'user already exists') { // user with this email already registered
  //       console.log(res.data);
  //     } else { // user added goto login
  //       this.handleSigninClick();
  //     }
  //   });
  // }
  signup(signupForm: NgForm) {
    this.afService.signupWithEmailPassword(signupForm.value.email, signupForm.value.password)
    .then(result => {
      this.afService.insertUser(signupForm.value);
      signupForm.resetForm();
      this.toastr.success('Signed up successfully', 'User');
      this.handleSigninClick();
    }).catch(error => {
      this.toastr.error('Error in signup', error.message);
      // console.log(error.code, error.message);
    });
  }
}
