import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../../services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes: any[];

  constructor(private getRecipes: RecipesService) {}

  ngOnInit() {
    this.getRecipes.fetchRecipes().subscribe((data: any[]) => {
      this.recipes = data;
    });
  }

  sortAlphabetical() {
    this.recipes = this.recipes.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  sortAscIngredientCount() {
    this.recipes = this.recipes.sort((a, b) =>
      a.ingredients.length < b.ingredients.length ? 1 : -1
    );
  }

  sortDecIngredientCount() {
    this.recipes = this.recipes.sort((a, b) =>
      a.ingredients.length > b.ingredients.length ? 1 : -1
    );
  }
}
