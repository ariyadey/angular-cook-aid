import {Injectable} from '@angular/core';
import {RecipeService} from "../recipes/recipe.service";
import {HttpClient} from "@angular/common/http";
import {RecipeModel} from "../recipes/recipe.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService) { }

  saveRecipes() {
    this.http
      .put<RecipeModel[]>(
        "https://ng-course-project-99377-default-rtdb.europe-west1.firebasedatabase.app/recipes.json",
        this.recipeService.recipes)
      .subscribe(recipes => {
        console.log(recipes);
      });
  }

  fetchRecipes() {
    this.http
      .get<RecipeModel[]>("https://ng-course-project-99377-default-rtdb.europe-west1.firebasedatabase.app/recipes.json")
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ?? []
            }
          })
        }))
      .subscribe(recipes => {
        console.log(recipes);
        this.recipeService.recipes = recipes;
      });
  }
}
