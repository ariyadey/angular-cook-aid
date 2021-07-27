import {Component, Input, OnInit} from '@angular/core';
import {RecipeModel} from "../../recipe.model";
import {RecipeService} from "../../recipe.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe!: RecipeModel;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onSelectRecipe() {
    this.recipeService.recipeSelect.emit(this.recipe);
  }
}
