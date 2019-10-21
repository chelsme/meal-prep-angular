import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesService } from '../../../services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit, OnDestroy {
  recipes: any[];
  recipesSubscription;

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.recipesSubscription = this.recipesService.recipes.subscribe(
      (resp) => (this.recipes = resp)
    );
  }

  ngOnDestroy() {
    this.recipesSubscription.unsubscribe();
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
