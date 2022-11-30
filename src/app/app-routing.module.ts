import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrinkComponent } from './pages/drink/drink.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { IngredientComponent } from './pages/ingredient/ingredient.component';
import { OrderComponent } from './pages/order/order.component';


const routes: Routes = [
  /*{ path: 'login', component: LoginComponent },*/
  { path: 'home', component: HomeComponent },
  { path: 'drink/:idDrink', component: DrinkComponent },
  { path: 'ingredient/:name', component: IngredientComponent },
  { path: 'order', component: OrderComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
