import { Ingredient } from './../models/ingredient';
import { Recipe } from './../models/recipe';
export class RecipeService {
    private recipes: Recipe[] = [];

    addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
        this.recipes.push(new Recipe(title, description, difficulty, ingredients));
    }

    addRecipes(items: Recipe[]) {
        this.recipes.push(...items);
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = new Recipe(recipe.title, recipe.description, recipe.difficulty, recipe.ingredients);
    }

    removeRecipe(index: number) {
        this.recipes.splice(index, 1);
    }

    getRecipes() {
        return this.recipes.slice();
    }
}