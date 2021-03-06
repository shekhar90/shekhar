import { Component, OnInit, TemplateRef } from '@angular/core';
import * as $ from 'jquery';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { Category } from '../category';
import { Difficulty } from '../difficulty';
import { PracticeCard } from '../practice-card';
import { Question } from '../question';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { isArray } from 'util';
import * as _ from 'lodash';
import { QDATA } from '../data/question';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {
  qdata = QDATA;
  constructor(
    private modalService: BsModalService,
    private httpClient: HttpClient
  ) {
    this.initializeModel();
    // console.log('QDATA -> ', QDATA);
  }
  categories: Category[] = [
    { id: '1', categoryDescription: 'Problems on train' },
    { id: '2', categoryDescription: 'Permutations and combinations' }
  ];
  difficulty: Difficulty[] = [
    { id: '1', levelDescription: 'Easy' },
    { id: '1', levelDescription: 'Medium' },
    { id: '1', levelDescription: 'Hard' }
  ];
  answerArray: number[] = [];
  progress: {
    correct: number;
    wrong: number;
    totalQ: number;
    correctPer: number;
    wrongPer: number;
  }; // = {correct: 0, wrong: 0, totalQ: this.questions.length, correctPer: 0, wrongPer: 0};
  firstSelection: number = -1; // first selected option by user for current question reset to -1 for new question
  questions: any;
  nextQuestionIndex = 0;
  questionArrLen: number; // = this.questions.length;
  optionValidationArr: boolean[] = []; // stores either this option has been clicked by user or not
  model = new PracticeCard(
    'Aptitude',
    this.categories[0].categoryDescription,
    this.difficulty[0].levelDescription,
    'Next'
  );
  nextDataTgt = '#questionModalCenter';
  resultMsg: {
    fullyCorrect: string;
    partiallyCorrect: string;
  } = {
    fullyCorrect: 'Congratulations you have completed the set!',
    partiallyCorrect:
      'Would you like to try not attempted questions/wrongly answered questions once again!'
  };
  isAllQuestionModelVisible = false;
  modalRef: BsModalRef;
  highlighted = false;
  initializeModel() {
    this.qdata.forEach((data, index) => {
      this.qdata[index]['categoryDescription'] = data.categories[0].categoryDescription;
      this.qdata[index]['levelDescription'] = this.difficulty[0].levelDescription;
    });
  }
  handleNextClick(template: TemplateRef<any>) {
    // TODO api call get questions array on the basis of selected
    // 1. category
    // 2. difficulty
    console.log(
      this.model.categoryDescription + ' ' + this.model.levelDescription
    );
    const params = new HttpParams()
      .set('questionType', this.model.categoryDescription)
      .set('difficulty', this.model.levelDescription);
    this.httpClient
      .get('questions/getQuestions', { params })
      .subscribe(data => {
        if (isArray(data)) {
          this.questions = data;
          this.questionArrLen = this.questions.length;
          this.progress = {
            correct: 0,
            wrong: 0,
            totalQ: this.questions.length,
            correctPer: 0,
            wrongPer: 0
          };
          console.log('fetching questions from db' + this.questions);
          this.closeModal();
          if (_.gt(this.questionArrLen, 0)) {
            this.openModal(template);
          } else {
            console.log('No questions available');
          }
        }
      });
  }

  getNextQuestion(
    template: TemplateRef<any>,
    resultTemplate: TemplateRef<any>
  ) {
    if (_.lt(_.sum([this.nextQuestionIndex, 1]), this.questionArrLen)) {
      //  TODO go to next question
      this.closeModal();
      this.nextQuestionIndex++;
      this.firstSelection = -1; // reset first selection for new question
      this.optionValidationArr = []; // reset validation array
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

  getPercentage(value, total) {
    return _.round(_.divide(_.multiply(value, 100), total), 2);
  }
  handleOptionClick(indexOfOption) {
    this.optionValidationArr[indexOfOption] = true;
    // TODO if user is able to choose correct option on first click
    // Add one in correct
    // else Add one to wrong
    if (_.eq(this.firstSelection, -1)) {
      this.firstSelection = indexOfOption;
      if (_.eq(this.questions[this.nextQuestionIndex].answer, indexOfOption)) {
        this.progress.correct++;
        this.progress.correctPer = this.getPercentage(
          this.progress.correct,
          this.progress.totalQ
        );
      } else {
        this.progress.wrong++;
        this.progress.wrongPer = this.getPercentage(
          this.progress.wrong,
          this.progress.totalQ
        );
      }
      this.answerArray[this.nextQuestionIndex] = indexOfOption;
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  closeModal() {
    this.modalRef.hide();
  }

  handleAllQuestionsClick(resultTemplate: TemplateRef<any>) {
    // TODO hide question modal
    // show all question model with status of all questions
    this.closeModal();
    this.openModal(resultTemplate);
    this.isAllQuestionModelVisible = true;
  }
  handleGoBackToPractice(template: TemplateRef<any>) {
    this.closeModal();
    this.isAllQuestionModelVisible = false;
    this.openModal(template);
  }
  resetOptionValidationArr(indexOfClickedQuestion: number) {
    //  TODO if already selected option is correct then disable other options after
    //  initializing optionValidationArr with correct value
    //  if wrong or not answered just initialize the optionValidationArr arr
    this.optionValidationArr = [];
    const correctAns: boolean =
      this.answerArray[indexOfClickedQuestion] &&
      _.eq(this.answerArray[indexOfClickedQuestion], this.questions[indexOfClickedQuestion].answer);
    if (
      !this.answerArray[indexOfClickedQuestion] &&
      !_.eq(this.answerArray[indexOfClickedQuestion], 0)
    ) {
      // undefined and not 0: 0 means first option
      this.firstSelection = -1;
      // dont update anything
    } else if (correctAns) {
      // correct answer
      this.firstSelection = this.answerArray[indexOfClickedQuestion];
      this.optionValidationArr[this.answerArray[indexOfClickedQuestion]] = true;
    } else {
      // wrong answer
      // TODO reduce number of wrong ans by one
      this.progress.wrong--;
      this.answerArray[indexOfClickedQuestion] = undefined; // change to not answered
      this.firstSelection = -1;
      this.progress.wrongPer = this.getPercentage(
        this.progress.wrong,
        this.progress.totalQ
      );
    }
  }
  handleQuestionClick(
    template: TemplateRef<any>,
    indexOfClickedQuestion: number
  ) {
    this.closeModal();
    this.isAllQuestionModelVisible = false;
    this.nextQuestionIndex = indexOfClickedQuestion;
    this.resetOptionValidationArr(indexOfClickedQuestion);
    this.openModal(template);
  }
  handleEndPracticeClick() {
    // reset all practice data
    this.optionValidationArr = [];
    this.answerArray = [];
    this.progress = {
      correct: 0,
      wrong: 0,
      totalQ: this.questions.length,
      correctPer: 0,
      wrongPer: 0
    };
    this.closeModal();
  }
  updateModel(categoryDescription, levelDescription) {
    this.model = new PracticeCard(
      'Aptitude',
      categoryDescription,
      levelDescription,
      'Next'
    );
  }
  ngOnInit() {}
}
