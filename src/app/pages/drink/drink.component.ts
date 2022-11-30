import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/_service/api.service';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
})
export class DrinkComponent implements OnInit {
  drink: any = {
    ingredients: [],
    instructions: [],
  };
  inputSearch: string = '';
  //checkStringSearch: string = ''; //controllo della barra di ricerca. Se la stringa è vuota, il bottone search si blocca
  checkStringSearch: boolean = false;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('idDrink')!;
    this.httpClient
      .get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id)
      .subscribe((response: any) => {
        this.drink = response.drinks[0];
        this.drink.ingredients = [];
        this.drink.instructions = [];
        Object.keys(this.drink).forEach((key) => {
          if (key.startsWith('strIngredient') && this.drink[key]) {
            const index = key.replace('strIngredient', '');
            console.log(index);
            this.drink.ingredients.push({
              name: this.drink[key],
              measure: this.drink['strMeasure' + index],
            });
          }
          if (key.startsWith('strInstructions') && this.drink[key]) {
            let lang = key.replace('strInstructions', '');
            if (!lang) {
              lang = 'EN';
            }
            console.log(lang);
            this.drink.instructions[lang] = this.drink[key];
          }
        });
        console.log(this.drink);
      });
  }

  search() {
    if (this.inputSearch === '') {
      this.checkStringSearch = false;
    } else {
      this.checkStringSearch = true;
      return this.searchDrinksByName();
    }
  }

  /**
   * Ricerca di tutti quei drink tramite il loro nome
   */
  searchDrinksByName() {
    this.apiService
      .searchCocktailByFirstName(this.inputSearch)
      .subscribe((response: any) => {
        if (!response) {
          this.drink = [];
        } else {
          this.drink = response.drinks[0];
          this.drink.ingredients = [];
          this.drink.instructions = [];
        }
  
        Object.keys(this.drink).forEach((key) => {
          if (key.startsWith('strIngredient') && this.drink[key]) {
            const index = key.replace('strIngredient', '');
            console.log(index);
            this.drink.ingredients.push({
              name: this.drink[key],
              measure: this.drink['strMeasure' + index],
            });
          }
          if (key.startsWith('strInstructions') && this.drink[key]) {
            let lang = key.replace('strInstructions', '');
            if (!lang) {
              lang = 'EN';
            }
            console.log(lang);
            this.drink.instructions[lang] = this.drink[key];
          }
        });
        console.log(this.drink);
      });
        //ordina l'array alfabeticamente
    
  }

  /**
   * Funzione che ritorna un cocktail casuale tra quelli presenti nel DB
   */
  randomCocktail() {
    this.apiService
    .searchCocktailRandom()
    .subscribe((response: any) => {
      if (!response) {
        this.drink = [];
      } else {
        this.drink = response.drinks[0];
        this.drink.ingredients = [];
        this.drink.instructions = [];
      }

      Object.keys(this.drink).forEach((key) => {
        if (key.startsWith('strIngredient') && this.drink[key]) {
          const index = key.replace('strIngredient', '');
          console.log(index);
          this.drink.ingredients.push({
            name: this.drink[key],
            measure: this.drink['strMeasure' + index],
          });
        }
        if (key.startsWith('strInstructions') && this.drink[key]) {
          let lang = key.replace('strInstructions', '');
          if (!lang) {
            lang = 'EN';
          }
          console.log(lang);
          this.drink.instructions[lang] = this.drink[key];
        }
      });
      console.log(this.drink);
    });
  }

  hamClick!: boolean;

  hamburgerClick(){
    this.hamClick = !this.hamClick;
  }
}
