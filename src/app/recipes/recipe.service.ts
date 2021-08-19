import {Injectable} from '@angular/core';
import {RecipeModel} from "./recipe.model";
import {IngredientModel} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private _recipes: RecipeModel[] = [];
  private _recipeChange = new Subject<RecipeModel[]>();

  constructor(private shoppingListService: ShoppingListService) { }

  get recipes(): RecipeModel[] {
    return this._recipes.slice();
  }

  get recipeChange(): Subject<RecipeModel[]> {
    return this._recipeChange;
  }

  set recipes(value: RecipeModel[]) {
    this._recipes = value;
    this._recipeChange.next(this._recipes.slice());
  }

  addToShoppingList(ingredients: IngredientModel[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  recipeById(id: number) {
    return this._recipes[id];
  }

  addRecipe(recipe: RecipeModel) {
    this._recipes.push(recipe);
    this._recipeChange.next(this._recipes.slice());
  }

  updateRecipe(recipe: RecipeModel, id: number) {
    this._recipes[id] = recipe;
    this._recipeChange.next(this._recipes.slice());
  }

  deleteRecipe(id: number) {
    this._recipes.splice(id, 1);
    this._recipeChange.next(this._recipes.slice());
  }
}
