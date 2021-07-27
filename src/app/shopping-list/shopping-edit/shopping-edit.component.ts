import {EventEmitter, Output} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {IngredientModel} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() addIngredient = new EventEmitter<IngredientModel>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredient(name: string, amount: string) {
    this.addIngredient.emit(new IngredientModel(name, +amount));
  }
}
