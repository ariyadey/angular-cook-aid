import {Injectable} from '@angular/core';
import {IngredientModel} from "../shared/ingredient.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private _ingredients: IngredientModel[] = [
    new IngredientModel("Apples", 3),
    new IngredientModel("Tomatoes", 5)
  ];
  private _ingredientChange = new Subject<IngredientModel[]>();

  constructor() { }

  get ingredients(): IngredientModel[] {
    return this._ingredients.slice();
  }

  get ingredientChange(): Subject<IngredientModel[]> {
    return this._ingredientChange;
  }

  addIngredient(ingredientModel: IngredientModel) {
    this._ingredients.push(ingredientModel);
    this._ingredientChange.next(this._ingredients.slice());
  }

  addIngredients(ingredients: IngredientModel[]) {
    this._ingredients.push(...ingredients);
    this._ingredientChange.next(this._ingredients.slice());
  }
}
