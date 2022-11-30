import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  inputSearch: string = '';
  typeOfChoice: string = '';
  showNavBar: boolean = false;
  isChecked: boolean = false;
  drinks: any[] = [];
  letters: any[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  /* ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]; */

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService
      .searchCocktailByFirstLetter('a')
      .subscribe((response: any) => {
        console.log(response);
        this.drinks = response.drinks;
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
  }

  showNavBarFunction(){
    if (this.showNavBar === false){
      this.showNavBar = true
    }
  }

  /**
   * Ricerca di tutti quei drink che iniziano con quella determinata lettera
   */
  searchDrinksByLetter(letter: string) {
    this.apiService
      .searchCocktailByFirstLetter(letter)
      .subscribe((response: any) => {
        console.log(response);
        this.drinks = response.drinks;
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
  }

  search() {
    if (this.typeOfChoice === 'searchToName') {
      this.isChecked = true;
      return this.searchDrinksByName();
    } else {
      this.isChecked = true;
      return this.searchDrinksByIngredient();
    }
  }

  /**
   * Ricerca di tutti quei drink tramite il loro nome
   */
  searchDrinksByName() {
    this.apiService
      .searchCocktailByFirstName(this.inputSearch)
      .subscribe((response: any) => {
        console.log(response);
        this.isChecked = false;
        if (!response) {
          this.drinks = [];
        } else {
          this.drinks = response.drinks;
        }
        //controlla se l'array dei drink non è pieno
        if (!this.drinks) {
          this.drinks = [];
        }
        //ordina l'array alfabeticamente
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
  }

  /**
   * Ricerca di tutti quei drink tramite il loro nome
   */
  searchDrinksByIngredient() {
    this.apiService
      .searchCocktailFilter(this.inputSearch)
      .subscribe((response: any) => {
        console.log(response);
        this.isChecked = false;
        if (!response) {
          this.drinks = [];
        } else {
          this.drinks = response.drinks;
        }
        //controlla se l'array dei drink non è pieno
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
      this.isChecked = false;
      if (!response) {
        this.drinks = [];
      } else {
        this.drinks = response.drinks;
      }
    });
  }


  hamClick!: boolean;

  hamburgerClick(){
    this.hamClick = !this.hamClick;
  }


}
