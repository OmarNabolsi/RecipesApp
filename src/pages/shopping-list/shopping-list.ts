import { AuthService } from './../../services/auth';
import { SLOptionsPage } from './sl-options/sl-options';
import { ShoppingListService } from './../../services/shopping-list';
import { Component } from '@angular/core';
import { IonicPage, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../models/ingredient';


@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  ListItem: Ingredient[];
  
  constructor(private shoppingListService: ShoppingListService, 
              private popoverCtrl: PopoverController,
              private authService: AuthService, 
              private slService: ShoppingListService, 
              private loadingCtrl: LoadingController, 
              private alertCtrl: AlertController) {
  }

  ionViewWillEnter(){
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.shoppingListService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onCheckItem(index: number) {
    this.shoppingListService.removeItem(index);
    this.loadItems();
  }

  private loadItems() {
    this.ListItem = this.shoppingListService.getItems();
  }

  onShowOption(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait..'
    });
    const popover = this.popoverCtrl.create(SLOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if(data.action == 'load') {
          loading.present();
          this.authService.getActiveUser().getToken()
            .then(
              (token: string) => {
                this.slService.fetchList(token)
                  .subscribe(
                    (list: Ingredient[]) => {
                      loading.dismiss();
                      if (list) {
                        this.ListItem = list;
                      } else {
                        this.ListItem = [];
                      }
                    },
                    error => {
                      loading.dismiss();
                      this.handleError(error.json().error);
                    });
              });
        } else if (data.action == 'store') {
          loading.present();
          this.authService.getActiveUser().getToken()
            .then(
              (token: string) => {
                this.slService.storeList(token)
                  .subscribe(
                    () => {
                      loading.dismiss();
                    },
                    error => {
                      loading.dismiss();
                      this.handleError(error.json().error);
                    });
              });
        }
    });
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error has occured!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }
}
