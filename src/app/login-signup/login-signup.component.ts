import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}
  login: boolean;
  ngOnInit() {
    this.login = this.route.snapshot.data.login;
  }
  onSignupClick() {
    this.login = false;
  }
  onSigninClick() {
    this.login = true;
  }
}
