import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { Difficulty } from '../difficulty';
import { PracticeCard } from '../practice-card';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {
  categories: Category[] = [{ id: "1", categoryDescription: "Problems on train" }, { id: "2", categoryDescription: "Permutations and combinations" }];
  difficulty: Difficulty[] = [{ id: "1", levelDescription: "Easy" }, { id: "1", levelDescription: "Medium" }, { id: "1", levelDescription: "Hard" }]
  model = new PracticeCard("Aptitude",
    this.categories[0].categoryDescription,
    this.difficulty[0].levelDescription,
    "Next");
    handleNextClick() {
      console.log(this.model);
    }
  constructor() { }

  ngOnInit() {
  }

}
