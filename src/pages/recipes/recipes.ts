import { RecipeService } from './../../services/recipe';
import { Recipe } from './../../models/recipe';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, PopoverController, IonicPage } from 'ionic-angular';
import { RecipePage } from '../recipe/recipe';
import { SLOptionsPage } from '../sl-options/sl-options';
import { AuthService } from '../../services/auth';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[] = [];

  constructor(
    private navCtrl: NavController, 
    private recipeService: RecipeService, 
    private popoverCtrl: PopoverController,
    private loadingCtrl: LoadingController, 
    private alertCtrl: AlertController,
    private authService: AuthService) {}

  ionViewWillEnter(){
   this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index} );
  }

  onShowOption(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    const popover = this.popoverCtrl.create(SLOptionsPage);
    popover.present({ev: event});

    popover.onDidDismiss(
      data => {
        if (!data) {
          return;
        }
        if (data.action == 'load') {
          loading.present();
          this.authService.getActiveUser().getIdToken()
            .then((token: string) => {
              this.recipeService.fetchList(token)
                .subscribe((list: Recipe[]) => {
                  loading.dismiss();
                  if (list) {
                    this.recipes = list;
                  } else {
                    this.recipes = [];
                  }
                },
                error => {
                  loading.dismiss();
                  this.handleError(error.json().error);
                });
          });
        } else if (data.action = 'store') {
          loading.present();
          this.authService.getActiveUser().getIdToken()
            .then((token: string) => {
              this.recipeService.storeList(token)
                .subscribe(() => {
                  loading.dismiss();
                }, error => {
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
