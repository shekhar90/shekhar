import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @Output() onSigninClick = new EventEmitter<boolean>();
  constructor(private httpClient: HttpClient) { }
  model = new User();
  ngOnInit() {
  }
  handleSigninClick() { // only for routing to signin page
    this.onSigninClick.emit();
  }
  handleSignupClick() { // post form data to backend
    this.httpClient.post('http://localhost:3000/signup', this.model)
    .subscribe(data => {
      const res: any = data;
      if (res.status === 'error') { // Error in adding new user
        console.log(res.data);
      } else if (res.status === 'success' && res.data.msg === 'user already exists') { // user with this email already registered
        console.log(res.data);
      } else { // user added goto login
        this.handleSigninClick();
      }
    });
  }
}
