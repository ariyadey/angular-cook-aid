import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
      "Popular middle eastern food",
      "https://www.irantravelingcenter.com/wp-content/uploads/2015/09/kebabs.jpg"
    ),
    new RecipeModel(
      "Ghormeh Sabzi",
      "Delicious Persian food",
      "https://duckduckgo.com/i/98d89bba.jpg"
    )
  ];

  @Output() recipeClick = new EventEmitter<RecipeModel>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
