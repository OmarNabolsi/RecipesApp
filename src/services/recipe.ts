import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthService } from './auth';
import { Ingredient } from './../models/ingredient';
import { Recipe } from './../models/recipe';
import 'rxjs/Rx';

@Injectable()
export class RecipeService {
    private recipes: Recipe[] = [];

    constructor(
        private authService: AuthService, 
        private http: Http) {}

    addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
        this.recipes.push(new Recipe(title, description, difficulty, ingredients));
    }

    addRecipes(items: Recipe[]) {
        this.recipes.push(...items);
    }

    updateRecipe(index: number, title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
        this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
    }

    removeRecipe(index: number) {
        this.recipes.splice(index, 1);
    }

    getRecipes() {
        return this.recipes.slice();
    }

    storeList(token: string) {
        const userId = this.authService.getActiveUser().uid;

        return this.http.put('https://recipebook-275f2.firebaseio.com/' + userId + '/recipes.json?auth=' + token, this.recipes)
            .map((response: Response) => {
                return response.json();
            });
    }

    fetchList(token: string) {
        const userId = this.authService.getActiveUser().uid;

        return this.http.get('https://recipebook-275f2.firebaseio.com/' + userId + '/recipes.json?auth=' + token)
            .map((response: Response) => {
                const recipes: Recipe[] = response.json() ? response.json() : [];
                for (let item of recipes) {
                    if (!item.hasOwnProperty('ingredients')) {
                        item.ingredients = [];
                    }
                }
                return recipes;
            })
            .do(data => {
                if (data) {
                    this.recipes = data;
                } else {
                    this.recipes = [];
                }
            });
    }
}