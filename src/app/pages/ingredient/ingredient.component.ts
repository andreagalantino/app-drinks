import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/_service/api.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
})
export class IngredientComponent implements OnInit {
  apiService: any;
  drinks: any[] = [];

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const ingredient = this.route.snapshot.paramMap.get('name')!;
    this.httpClient
      .get(
        'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + ingredient
      )
      .subscribe((response: any) => {
        console.log(response);
        this.drinks = response.drinks;
        if (!this.drinks) {
          this.drinks = [];
        }
      });
  }

  /**
   * Ricerca di tutti quei drinks tramite il loro nome
   */
  searchDrinksByName() {
    let input = document.getElementById('inputSearch') as HTMLInputElement;
    let search = input?.value; //input?.value - prende quello che viene inserito dalla barra di ricerca
    this.apiService
      .searchCocktailByFirstName(search)
      .subscribe((response: any) => {
        console.log(response);
        this.drinks = response.drinks;
        //controlla se l'array dei drinks non è pieno
        if (!this.drinks) {
          this.drinks = [];
        }
        //ordina l'array alfabeticamente
        this.drinks.sort((a: any, b: any) => {
          const nameA = a.strDrinks.toUpperCase(); // ignore upper and lowercase
          const nameB = b.strDrinks.toUpperCase(); // ignore upper and lowercase
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
  }

  /**
   * Ricerca di tutti quei drinks tramite il loro nome
   */
  searchDrinksByIngredient() {
    let input = document.getElementById('inputSearch') as HTMLInputElement;
    let search = input?.value; //input?.value - prende quello che viene inserito dalla barra di ricerca
    this.apiService.searchCocktailFilter(search).subscribe((response: any) => {
      console.log(response);
      this.drinks = response.drinks;
      //controlla se l'array dei drinks non è pieno
      if (!this.drinks) {
        this.drinks = [];
      }
    });
  }

  /**
   * Funzione che ritorna un cocktail casuale tra quelli presenti nel DB
   */
  randomCocktail() {
    this.apiService.searchCocktailRandom().subscribe((response: any) => {
      console.log(response);
      this.drinks = response.drinks;
      if (!this.drinks) {
        this.drinks = [];
      }
    });
  }


  hamClick!: boolean;

  hamburgerClick(){
    this.hamClick = !this.hamClick;
  }
}
