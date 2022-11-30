import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/_service/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent {
  searchNameIng: string = '';
  drinks: any[] = [];
  drinksIntoCart: any[] = [];
  fullArray: boolean = false;
  toggle: boolean = false;
  hamClick!: boolean;


  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  searchByName = () => {
    this.apiService
      .searchCocktailByFirstName(this.searchNameIng)
      .subscribe((response: any) => {
        /*         console.log(response); */
        if (!response) {
          this.drinks = [];
        } else {
          this.drinks = response.drinks;
        }

        if (!this.drinks) {
          this.drinks = [];
        }

        this.drinks.sort((a: any, b: any) => {
          const nameA = a.strDrink.toUpperCase(); // ignore upper and lowercase
          const nameB = b.strDrink.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
      });
  };

  clickToOrder(item: any) {
    item.selected = true;

    if (this.fullArray === false) {
      this.drinksIntoCart.push(item);
      this.toggle = true;
      /* this.checkColor = false; */
      /* console.log(this.drinksIntoCart) */
    }

    if (this.drinksIntoCart.length > 5) {
      this.fullArray = true;
      this.drinksIntoCart.splice(this.drinksIntoCart.length - 1);
      item.selected = false;
      alert('Non puoi selezionare più di 5 drink!!!');
    }
    this.fullArray = false;
  }

  removeItem(drink: any) {
    this.drinksIntoCart.splice(this.drinksIntoCart.indexOf(drink), 1);
    drink.selected = false;
  }

  warningCart() {
    if (this.drinksIntoCart.length < 2) {
      alert('Enter at least 2 drinks');
    }
  }


  /**
   * Open menù navbar
   */
  hamburgerClick(){
    this.hamClick = !this.hamClick;
  }

  
}
