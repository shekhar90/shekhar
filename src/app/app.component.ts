import { Component } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AlertComponent } from './utility-component/alert/alert.component';
// import { AuthenticationService } from './shared/authentication.service';
import { RoutingService } from './shared/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(
    // public afService: AuthenticationService,
    // private toastr: ToastrService,
    private router: Router,
    private routingService: RoutingService
  ) {}
  // logout() {
  //   this.afService.logout()
  //   .then(result => {
  //     this.toastr.success('Logged out successfully', 'User');
  //     this.routingService.goto('/login');
  //   }).catch(error => {
  //     this.toastr.error('Error in logging in', error.message);
  //   });
  // }
}
