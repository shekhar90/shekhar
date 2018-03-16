import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../user-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() onSignupClick = new EventEmitter<boolean>();
  constructor(private httpClient: HttpClient, private router: Router) { }
  model = new UserLogin();
  ngOnInit() {
  }
  handleSignupClick() {
    this.onSignupClick.emit();
  }
  gotoPractice() {
    this.router.navigate(['/practice']);
  }
  handleLoginClick() { // post form data to backend
    this.httpClient.post('http://localhost:3000/login', this.model)
    .subscribe(data => {
      const res: any = data;
      if (res.status === 'error') { // Error in adding new user
        console.log(res.data);
      } else { // valid user added goto homepage
        console.log('go to home page');
        this.gotoPractice();
      }
    });
  }
}
