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
    options: {
      o1: "18",
      o2: "12",
      o3: "6",
      o4: "0"
    },
    answer: "o3"
  },{
    id: "2",
    questionType: "Permutations and combinations",
    difficulty: "Easy",
    question: "An arrangement of finite numbers of objects taken some or all at a time is called their",
    options: {
      o1: "A.P",
      o2: "Combination",
      o3: "Sequence",
      o4: "Permutation"
    },
    answer: "o4"
  }];
  nextQuestionIndex: number = 0;
  questionArrLen: number = this.questions.length;
  model = new PracticeCard("Aptitude",
    this.categories[0].categoryDescription,
    this.difficulty[0].levelDescription,
    "Next");
  handleNextClick() {
    console.log(this.model);
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

