import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes!: RecipeModel[];
  recipeChangeSubscription!: Subscription;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.recipes;
    this.recipeChangeSubscription = this.recipeService.recipeChange
      .subscribe(recipes => {
        return this.recipes = recipes;
      });
  }

  ngOnDestroy(): void {
    this.recipeChangeSubscription.unsubscribe();
  }
}
