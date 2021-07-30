import { Injectable } from '@angular/core';
import {RecipeModel} from "./recipe.model";
import {IngredientModel} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private _recipes: RecipeModel[] = [
    new RecipeModel(
      "Kebab",
      "Popular middle eastern food",
      "https://www.irantravelingcenter.com/wp-content/uploads/2015/09/kebabs.jpg",
      [
        new IngredientModel("Meat", 5),
        new IngredientModel("Rice", 10),
      ]
    ),
    new RecipeModel(
      "Ghormeh Sabzi",
      "Delicious Persian food",
      "https://duckduckgo.com/i/98d89bba.jpg",
      [
        new IngredientModel("Meat", 5),
        new IngredientModel("Rice", 10),
        new IngredientModel("Bean", 5),
        new IngredientModel("Vegetables", 3),
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  get recipes(): RecipeModel[] {
    return this._recipes.slice();
  }

  addToShoppingList(ingredients: IngredientModel[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  recipeById(id: number) {
    return this._recipes[id];
  }
}
