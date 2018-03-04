import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @Output() onSigninClick = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }
  handleSigninClick() {
    this.onSigninClick.emit();
  }
}
