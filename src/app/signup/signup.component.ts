import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';

import { User } from '../user';
// import { AuthenticationService } from '../shared/authentication.service';
import { AuthService } from '../shared/auth.service';
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
    // public afService: AuthenticationService,
    private authService: AuthService,
    // private toastr: ToastrService,
    private utilityService: UtilityService) {
      // afService.getData();
    }
  model = new User();
  ngOnInit() {
  }
  handleSigninClick() { // only for routing to signin page
    this.onSigninClick.emit();
  }
  onRegisterSubmit(signupForm: NgForm) {
    // const user = {
    //   name: this.name,
    //   email: this.email,
    //   username: this.username,
    //   password: this.password
    // }

    // // Required Fields
    // if(!this.validateService.validateRegister(user)) {
    //   this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
    //   return false;
    // }

    // // Validate Email
    // if(!this.validateService.validateEmail(user.email)) {
    // this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
    //   return false;
    // }

    // Register user
    this.authService.registerUser(this.model).subscribe(data => {
    if (data.success) {
      this.utilityService.alertUtil.add('success', 'Successfully signed up. Please login.', 5000);
      signupForm.resetForm();
      this.handleSigninClick();
    } else {
      this.utilityService.alertUtil.add('danger', 'Error in signing up. Please try again.', 5000);
      // this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      // this.router.navigate(['/register']);
    }
  });
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
  // signup(signupForm: NgForm) {
  //   this.afService.signupWithEmailPassword(signupForm.value.email, signupForm.value.password)
  //   .then(result => {
  //     this.afService.insertUser(signupForm.value);
  //     signupForm.resetForm();
  //     this.toastr.success('Signed up successfully', 'User');
  //     this.handleSigninClick();
  //   }).catch(error => {
  //     this.toastr.error('Error in signup', error.message);
  //     // console.log(error.code, error.message);
  //   });
  // }
}
