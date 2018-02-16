import { Ingredient } from './../models/ingredient';
export class ShoppingListService {
    private ingredients: Ingredient[] = [];

    addItem(ingredient: Ingredient) {
        this.ingredients.push(new Ingredient(ingredient.name, ingredient.amount));
    }

    addItems(items: Ingredient[]) {
        this.ingredients.push(...items);
    }

    getItems() {
        return this.ingredients.slice();
    }

    removeItem(index: number) {
        this.ingredients.splice(index, 1);
    }
}