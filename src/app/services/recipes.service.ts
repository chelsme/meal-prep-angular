import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipes = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient, private router: Router) {}

  fetchRecipes() {
    return this.http
      .get('http://localhost:3000/recipes')
      .subscribe((data: any[]) => {
        this.recipes.next(data);
      });
  }

  createRecipe(recipeData, ingredientData) {
    let amounts = [];
    let ingredients = [];
    for (let ing in ingredientData) {
      if (ing.includes('amount')) {
        amounts.push(ingredientData[ing]);
      } else if (ing.includes('ingredient')) {
        ingredients.push(ingredientData[ing]);
      }
    }
    this.http
      .post('http://localhost:3000/recipes', {
        name: recipeData.name,
        instructions: recipeData.instructions,
        time: recipeData.time,
        user_id: recipeData.chef
      })
      .pipe(
        concatMap((resp) =>
          ingredients.map((ing, i) => {
            if (ing !== null) {
              this.http
                .post('http://localhost:3000/ingredients', {
                  recipe_id: resp['id'],
                  name: ingredients[i],
                  amount: amounts[i]
                })
                .subscribe((resp) => {
                  console.log(resp);
                  this.router.navigate(['/recipes']);
                });
            }
          })
        )
      )
      .subscribe(
        (success) => {
          console.log(success);
        },
        (errorData) => {
          console.log('womp womp', errorData);
        }
      );
  }
}
