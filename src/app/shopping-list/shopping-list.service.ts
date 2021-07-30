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
  private _ingredientEdit = new Subject<number>();

  get ingredients(): IngredientModel[] {
    return this._ingredients.slice();
  }

  get ingredientChange(): Subject<IngredientModel[]> {
    return this._ingredientChange;
  }

  get ingredientEdit(): Subject<number> {
    return this._ingredientEdit;
  }

  addIngredient(ingredientModel: IngredientModel) {
    this._ingredients.push(ingredientModel);
    this._ingredientChange.next(this._ingredients.slice());
  }

  addIngredients(ingredients: IngredientModel[]) {
    this._ingredients.push(...ingredients);
    this._ingredientChange.next(this._ingredients.slice());
  }

  updateIngredient(ingredient: IngredientModel, i: number) {
    this._ingredients[i] = ingredient;
    this._ingredientChange.next(this._ingredients.slice());
  }

  removeIngredient(index: number) {
    this._ingredients.splice(index, 1);
    this._ingredientChange.next(this._ingredients.slice());
  }

  ingredientAt(index: number) {
    return this._ingredients[index];
  }
}
