import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
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
        name: new FormControl(ingredient.name, Validators.required),
        amount: new FormControl(ingredient.amount, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)]),
      }));
    });
    this.form = new FormGroup({
      name: new FormControl(recipe.name, Validators.required),
      description: new FormControl(recipe.description, Validators.required),
      imagePath: new FormControl(recipe.imagePath, Validators.required),
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
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)]),
    }));
  }
}
