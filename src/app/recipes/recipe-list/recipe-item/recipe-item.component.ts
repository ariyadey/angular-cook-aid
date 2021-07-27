import {Component, Input, OnInit} from '@angular/core';
import {RecipeModel} from "../../recipe.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // @ts-ignore
  @Input() recipe: RecipeModel;

  constructor() { }

  ngOnInit(): void {
  }

}
