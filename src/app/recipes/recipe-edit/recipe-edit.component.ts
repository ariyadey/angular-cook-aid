import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {RecipeModel} from "../recipe.model";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  modeAdd!: boolean;
  id!: number;
  form!: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.modeAdd = params["id"] == null;
      this.id = params["id"];
      this.initForm();
    });
  }

  private initForm() {
    const recipe = this.modeAdd
      ? new RecipeModel("", "", "", [])
      : this.recipeService.recipeById(this.id);
    const ingredientsFormArray = new FormArray([]);
    recipe.ingredients.forEach((ingredient) => {
      ingredientsFormArray.push(new FormGroup({
        name: new FormControl(ingredient.name),
        amount: new FormControl(ingredient.amount),
      }));
    });
    this.form = new FormGroup({
      name: new FormControl(recipe.name),
      description: new FormControl(recipe.description),
      imagePath: new FormControl(recipe.imagePath),
      ingredients: ingredientsFormArray,
    });
  }

  getIngredientFormGroups() {
    return (this.form.get("ingredients") as FormArray).controls;
  }

  onSubmit() {
    console.log(this.form);
  }

  onAddIngredient() {
    (this.form.get("ingredients") as FormArray).push(new FormGroup({
      name: new FormControl(),
      amount: new FormControl(),
    }));
  }
}
