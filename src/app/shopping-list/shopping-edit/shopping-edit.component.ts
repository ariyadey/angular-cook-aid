import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IngredientModel} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("form") form!: NgForm;
  modeAdd!: boolean;
  ingredientEditSubscription!: Subscription;
  ingredientEditingIndex!: number;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.modeAdd = true
    this.ingredientEditSubscription = this.shoppingListService.ingredientEdit.subscribe(ingredientIndex => {
      this.modeAdd = false;
      this.ingredientEditingIndex = ingredientIndex;
      const ingredient = this.shoppingListService.ingredientAt(ingredientIndex);
      this.form.setValue({
        "name": ingredient.name,
        "amount": ingredient.amount,
      });
    });
  }

  ngOnDestroy(): void {
    this.ingredientEditSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.modeAdd) {
      this.addIngredient();
    } else {
      this.shoppingListService.updateIngredient(
        new IngredientModel(this.form.value.name, this.form.value.amount), this.ingredientEditingIndex);
    }
    this.resetForm();
  }

  private addIngredient() {
    this.shoppingListService.addIngredient(new IngredientModel(this.form.value.name, this.form.value.amount));
  }

  onDelete() {
    this.shoppingListService.removeIngredient(this.ingredientEditingIndex);
    this.resetForm();
  }

  resetForm() {
    this.form.resetForm();
    this.modeAdd = true;
  }
}
