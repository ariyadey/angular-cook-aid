import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import {RecipeModel} from "./recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private _recipes: RecipeModel[] = [
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
  private _recipeSelect = new EventEmitter<RecipeModel>();

  constructor() { }

  get recipes(): RecipeModel[] {
    return this._recipes.slice();
  }

  get recipeSelect(): EventEmitter<RecipeModel> {
    return this._recipeSelect;
  }
}
