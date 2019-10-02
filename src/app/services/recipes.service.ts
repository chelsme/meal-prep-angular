import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  constructor(private http: HttpClient, private router: Router) {}

  fetchRecipes() {
    return this.http.get('http://localhost:3000/recipes');
  }

  createRecipe(formData) {
    this.http
      .post('http://localhost:3000/recipes', {
        name: formData.name,
        instructions: formData.instructions,
        time: formData.time,
        user_id: 1
        // ingredients: 'test ingredients'
      })
      .subscribe((resp) => {
        console.log(resp);
        this.router.navigate(['/recipes']);
      });
  }
}
