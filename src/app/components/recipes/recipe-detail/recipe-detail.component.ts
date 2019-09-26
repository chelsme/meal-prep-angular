import { Component, OnInit, Input } from '@angular/core';
import { RecipesService } from '../../../services/recipes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe = {};
  selectedRecipeId;

  constructor(
    private getRecipes: RecipesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.selectRecipe();
  }

  selectRecipe() {
    if (Object.keys(this.recipe).length < 1) {
      this.route.params.subscribe((params) => {
        this.selectedRecipeId = params.id;
      });
      this.getRecipes.fetchRecipes().subscribe((data: any[]) => {
        this.recipe = data.find((recipe) => {
          return recipe.id === parseInt(this.selectedRecipeId);
        });
      });
    }
  }
}
