import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: RecipeModel[] = [
    new RecipeModel(
      "Kebab",
      "A test description for Kebab",
      "https://www.irantravelingcenter.com/wp-content/uploads/2015/09/kebabs.jpg"
    )
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
