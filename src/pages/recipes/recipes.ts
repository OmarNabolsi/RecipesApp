import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  constructor(private navCtrl: NavController) {}

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }
}
