import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RecipesService } from '../../../services/recipes.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnInit {
  createRecipeForm: FormGroup;

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.createRecipeForm = new FormGroup({
      name: new FormControl(null),
      instructions: new FormControl(null),
      time: new FormControl(null),
      ingredients: new FormControl(null)
    });
  }

  onCreateRecipe() {
    this.recipesService.createRecipe(this.createRecipeForm.value);
  }
}
