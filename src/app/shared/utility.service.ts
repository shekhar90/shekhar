import { Injectable } from '@angular/core';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

@Injectable()
export class UtilityService {
  pattern = {
    email: '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$',
    password: '[A-Za-z0-9]{6,14}' // Minimum 6 and max 14 characters
  };
  alertUtil = {
    alerts: [],
    add(type, msg, timeout): void {
      this.alerts.push({
        type: type,
        msg: msg,
        timeout: timeout
      });
    },
    onClosed(dismissedAlert: AlertComponent): void {
      this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
    }
  };
  constructor() { }

}
