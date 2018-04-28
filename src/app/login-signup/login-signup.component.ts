import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { AlertComponent } from '../utility-component/alert/alert.component';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    // private alertComponent: AlertComponent,
  ) {}
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
