import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { RecipesService } from '../../../services/recipes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  @Input() recipe = {};
  recipes;
  selectedRecipeId;
  routeSubscription;
  recipesSubscription;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.recipesSubscription = this.recipesService.recipes.subscribe((resp) => {
      this.recipes = resp;
      this.selectRecipe();
    });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }

    this.recipesSubscription.unsubscribe();
  }

  selectRecipe() {
    if (Object.keys(this.recipe).length < 1) {
      this.routeSubscription = this.route.params.subscribe((params) => {
        this.selectedRecipeId = params.id;
      });
      if (this.recipes.length > 0) {
        this.recipe = this.recipes.find((recipe) => {
          return recipe.id === parseInt(this.selectedRecipeId);
        });
      }
    }
  }
}
