import { Component, OnInit, AfterViewChecked  } from '@angular/core';
import { HighlightService } from '../shared/highlight.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked  {
  highlighted = false;
  constructor(private highlightService: HighlightService) { }

  ngOnInit() {
  }
  /**
   * Highlight blog post when it's ready
   */
  ngAfterViewChecked() {
    if (!this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }
}
