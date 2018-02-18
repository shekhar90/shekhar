import { Component, OnInit, TemplateRef  } from '@angular/core';
import * as $ from 'jquery';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Category } from '../category';
import { Difficulty } from '../difficulty';
import { PracticeCard } from '../practice-card';
import { Question } from '../question';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {
  categories: Category[] = [{ id: "1", categoryDescription: "Problems on train" }, { id: "2", categoryDescription: "Permutations and combinations" }];
  difficulty: Difficulty[] = [{ id: "1", levelDescription: "Easy" }, { id: "1", levelDescription: "Medium" }, { id: "1", levelDescription: "Hard" }];
  questions: Question[] = [{ // final question array returned by api on the basis of user selection 
    id: "1",
    questionType: "Permutations and combinations",
    difficulty: "Easy",
    question: "<sup>6</sup>P<sub>4</sub> is equal to",
    options: ["18",
      "12",
      "6",
      "0"],
    answer: 3
  }, {
    id: "2",
    questionType: "Permutations and combinations",
    difficulty: "Easy",
    question: "An arrangement of finite numbers of objects taken some or all at a time is called their",
    options: [
      "A.P",
      "Combination",
      "Sequence",
      "Permutation"
    ],
    answer: 4
  }];
  nextQuestionIndex: number = 0;
  questionArrLen: number = this.questions.length;
  model = new PracticeCard("Aptitude",
    this.categories[0].categoryDescription,
    this.difficulty[0].levelDescription,
    "Next");
    nextDataTgt: string = "#questionModalCenter";
    
  handleNextClick() {
    // TODO api call get questions array on the basis of selected
    // 1. category
    // 2. difficulty
  }
  getNextQuestion(template: TemplateRef<any>, resultTemplate: TemplateRef<any>) {  
    if ((this.nextQuestionIndex + 1) < this.questionArrLen) {
      //  TODO go to next question
      this.closeModal();
      this.nextQuestionIndex++;
      this.openModal(template);
    } else {
      // TODO for this selection all questions are over
      // show final score 
      // give option to load next set of questions
      this.nextQuestionIndex = 0;
      this.closeModal();
      this.openModal(resultTemplate);
    }
  }
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  closeModal() {
    this.modalRef.hide();
  }

  ngOnInit() {
  }

}

