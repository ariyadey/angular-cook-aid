import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngredientModel} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: IngredientModel[];
  ingredientsSubscription!: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.ingredients;
    this.ingredientsSubscription = this.shoppingListService.ingredientChange
      .subscribe(ingredients => this.ingredients = ingredients);
  }

  ngOnDestroy(): void {
    this.ingredientsSubscription.unsubscribe();
  }

  onEditIngredient(i: number) {
    this.shoppingListService.ingredientEdit.next(i);
  }
}
