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
  selectedRecipeId;
  routeSubscription;
  recipeSubscription;

  constructor(
    private getRecipes: RecipesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.selectRecipe();
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.recipeSubscription) {
      this.recipeSubscription.unsubscribe();
    }
  }

  selectRecipe() {
    if (Object.keys(this.recipe).length < 1) {
      this.routeSubscription = this.route.params.subscribe((params) => {
        this.selectedRecipeId = params.id;
      });
      this.recipeSubscription = this.getRecipes
        .fetchRecipes()
        .subscribe((data: any[]) => {
          this.recipe = data.find((recipe) => {
            return recipe.id === parseInt(this.selectedRecipeId);
          });
        });
    }
  }
}
