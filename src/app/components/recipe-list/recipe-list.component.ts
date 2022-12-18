import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { NewRecipeService } from 'src/app/services/new-recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[] = []

  constructor(
    private recipeService: NewRecipeService,
    ) {
    this.loadData()
   }

  ngOnInit(): void {
  }

  private loadData() {
    this.recipeService.getRecipes().subscribe(res => {
      this.recipes = res ? res : []
    }
    )
  }
}
