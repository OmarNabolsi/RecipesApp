import { RecipePage } from './../recipe/recipe';
import { ShoppingListPage } from './../shopping-list/shopping-list';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  slPage = ShoppingListPage;
  recipesPage = RecipePage;
}
