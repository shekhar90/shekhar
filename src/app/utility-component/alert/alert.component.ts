import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../shared/utility.service';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  constructor(
    private utilityService: UtilityService
  ) { }
  ngOnInit() {
  }
}
