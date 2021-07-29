import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "../../recipe.model";
import {RecipeService} from "../../recipe.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe!: RecipeModel;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      return this.recipe = this.recipeService.serverById(params["id"]);
    });
  }

  onToShoppingList() {
    this.recipeService.addToShoppingList(this.recipe.ingredients);
  }
}
