import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  // search
  searchCocktailByFirstLetter(firstLetter: string) {
    return this.httpClient.get(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=' + firstLetter
    );
  }

  searchCocktailByFirstName(name: string) {
    return this.httpClient.get(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + name
    );
  }

  searchCocktailRandom() {
    return this.httpClient.get(
      'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    );
  }

  // lookup

  // list
  // filter
  searchCocktailFilter(name: string) {
    return this.httpClient.get(
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + name
    );
  }

  // searchByS
}
