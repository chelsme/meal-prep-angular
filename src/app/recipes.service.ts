import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipes = {};

  constructor(private http: HttpClient) {}

  fetchRecipes() {
    this.http.get('http://localhost:3000/recipes').subscribe((response) => {
      this.recipes = response;
      return this.recipes;
    });
  }
}
