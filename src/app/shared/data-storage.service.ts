import { Injectable } from '@angular/core';
import {RecipeService} from "../recipes/recipe.service";
import {HttpClient} from "@angular/common/http";
import {RecipeModel} from "../recipes/recipe.model";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService) { }

  saveRecipes() {
    this.http
      .put<RecipeModel[]>(
        "https://ng-course-project-99377-default-rtdb.europe-west1.firebasedatabase.app/",
        this.recipeService.recipes)
      .subscribe(recipes => {
        console.log(`PUT response: ${recipes}`);
      });
  }

  fetchRecipes() {
    this.http
      .get<RecipeModel[]>("https://ng-course-project-99377-default-rtdb.europe-west1.firebasedatabase.app/")
      .subscribe(recipes => {
        console.log(`GET response: ${recipes}`);
        this.recipeService.recipes = recipes;
      });
  }
}
