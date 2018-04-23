import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../shared/authentication.service';
import { RoutingService } from '../shared/routing.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    public afService: AuthenticationService,
    private routingService: RoutingService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }
  loginWith(providerName: string) {
    if (!this.afService.user) {
      this.afService.authenticateWith(providerName)
      .then(result => {
        // this.routingService.goto('/practice');
        this.toastr.success('Logged in successfully', 'User');
      }).catch(error => {
        this.toastr.error('Error in logging in', error.message);
      });
    }
  }
}
