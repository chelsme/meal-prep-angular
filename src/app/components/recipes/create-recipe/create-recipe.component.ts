import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { RecipesService } from '../../../services/recipes.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnInit {
  createRecipeForm: FormGroup;
  ingredientCount = 1;
  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.createRecipeForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      instructions: new FormControl(null, Validators.required),
      time: new FormControl(null),
      amount1: new FormControl(null, Validators.required),
      ingredients1: new FormControl(null, Validators.required)
    });
  }

  onCreateRecipe() {
    this.recipesService.createRecipe(this.createRecipeForm.value);
  }

  addIngredients(n) {
    const amount = this.createRecipeForm.get(`amount${n}`);
    const ingredients = this.createRecipeForm.get(`ingredients${n}`);
    if (amount.valid && ingredients.valid) {
      this.ingredientCount = n + 1;
      this.createRecipeForm.controls[`amount${n + 1}`] = new FormControl(
        null,
        Validators.required
      );
      this.createRecipeForm.controls[`ingredients${n + 1}`] = new FormControl(
        null,
        Validators.required
      );
    }
  }

  formValid() {
    const name = this.createRecipeForm.get('name');
    const instructions = this.createRecipeForm.get('instructions');
    return name.valid && instructions.valid;
  }
}
