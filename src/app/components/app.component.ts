import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  location = 'SWOHO';
  purpose = 'meal prep';

  constructor(
    private userService: UsersService,
    private recipesService: RecipesService
  ) {}

  ngOnInit() {
    this.userService.fetchUsers();
    this.recipesService.fetchRecipes();
  }
}
