import { Injectable } from '@angular/core';
import {RecipeService} from "../recipes/recipe.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService) { }

  saveRecipes() {
    this.http
      .put(
        "https://ng-course-project-99377-default-rtdb.europe-west1.firebasedatabase.app/",
        this.recipeService.recipes)
      .subscribe(value => {
        console.log(value);
      });
  }
}
