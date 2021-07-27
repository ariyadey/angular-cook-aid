import {EventEmitter, Injectable} from '@angular/core';
import {IngredientModel} from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private _ingredients: IngredientModel[] = [
    new IngredientModel("Apples", 3),
    new IngredientModel("Tomatoes", 5)
  ];
  private _ingredientChange = new EventEmitter<IngredientModel[]>();

  constructor() { }

  get ingredients(): IngredientModel[] {
    return this._ingredients.slice();
  }

  get ingredientChange(): EventEmitter<IngredientModel[]> {
    return this._ingredientChange;
  }

  addIngredient(ingredientModel: IngredientModel) {
    console.log(ingredientModel);
    this._ingredients.push(ingredientModel);
    console.log(this._ingredients);
    this._ingredientChange.emit(this._ingredients.slice());
  }
}
