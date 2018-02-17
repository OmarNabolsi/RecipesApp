import { ShoppingListService } from './../../services/shopping-list';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { Recipe } from './../../models/recipe';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { ShoppingListPage } from '../shopping-list/shopping-list';
import { RecipeService } from '../../services/recipe';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{
  recipe: Recipe;
  index: number;

  constructor(
    public navParams: NavParams, 
    private navCtrl: NavController,
    private shoppingListService: ShoppingListService, 
    private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, {recipe: this.recipe, index: this.index, mode: 'Edit'});
  }

  onAddIngredients() {
    this.shoppingListService.addItems(this.recipe.ingredients);
    this.navCtrl.push(ShoppingListPage);
  }

  onDeleteRecipe() {
    this.recipeService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }
}
