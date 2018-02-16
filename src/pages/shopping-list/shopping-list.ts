import { ShoppingListService } from './../../services/shopping-list';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NgForm } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  constructor(private shoppingListService: ShoppingListService) {

  }
  onAddItem(form: NgForm){
    this.shoppingListService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
  }
}
