import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users/users.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { RecipesComponent } from './recipes/recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { CreateUserComponent } from './users/create-user/create-user.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'chefs', component: UsersComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'chefs/:id', component: UserDetailComponent },
  { path: 'recipes/:id', component: RecipeDetailComponent },
  { path: 'create-user', component: CreateUserComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent,
    UsersComponent,
    NavigationComponent,
    HomeComponent,
    RecipesComponent,
    RecipeDetailComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
