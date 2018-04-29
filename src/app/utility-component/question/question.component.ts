import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { HighlightService } from '../../shared/highlight.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, AfterViewChecked {
  @Input() question;
  highlighted = false;
  constructor(
    private highlightService: HighlightService
  ) { }

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
