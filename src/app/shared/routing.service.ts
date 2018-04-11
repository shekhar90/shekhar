import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

@Injectable()
export class RoutingService {
  constructor(private router: Router) { }
  goto(route) {
    this.router.navigate([route]);
  }
}
