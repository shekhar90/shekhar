import { Component, OnInit } from '@angular/core';
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
  questions: Question[] = [{
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
  handleNextClick() {
    // TODO api call get questions array on the basis of selected
    // 1. category
    // 2. difficulty
  }
  getNextQuestion() {
    if ((this.nextQuestionIndex + 1) < this.questionArrLen) {
      //  TODO go to next question
      this.nextQuestionIndex++;
    } else {
      // TODO for this selection all questions are over
      // show final score 
      // give option to load next set of questions
    }
  }
  constructor() { }

  ngOnInit() {
  }

}

