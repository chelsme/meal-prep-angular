import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { RecipesService } from '../../../services/recipes.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnInit, OnDestroy {
  createRecipeForm: FormGroup;
  createIngredientsForm: FormGroup;
  ingredientCount = 1;
  users;
  userSubscription;
  constructor(
    private recipesService: RecipesService,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.createRecipeForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      instructions: new FormControl(null, Validators.required),
      time: new FormControl(null),
      chef: new FormControl(null)
    });
    this.createIngredientsForm = new FormGroup({
      amount1: new FormControl(null, Validators.required),
      ingredients1: new FormControl(null, Validators.required)
    });

    this.userSubscription = this.userService.users.subscribe(
      (resp) => (this.users = resp)
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onCreateRecipe() {
    this.recipesService.createRecipe(
      this.createRecipeForm.value,
      this.createIngredientsForm.value
    );
  }

  addIngredients(n) {
    const amount = this.createIngredientsForm.get(`amount${n}`);
    const ingredients = this.createIngredientsForm.get(`ingredients${n}`);
    if (amount.valid && ingredients.valid) {
      this.ingredientCount = n + 1;
      this.createIngredientsForm.controls[`amount${n + 1}`] = new FormControl(
        null,
        Validators.required
      );
      this.createIngredientsForm.controls[
        `ingredients${n + 1}`
      ] = new FormControl(null, Validators.required);
    }
  }

  formValid() {
    const name = this.createRecipeForm.get('name');
    const instructions = this.createRecipeForm.get('instructions');
    return name.valid && instructions.valid;
  }
}
