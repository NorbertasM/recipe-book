import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Recipe } from '../models/recipe';


@Injectable({
  providedIn: 'root'
})
export class NewRecipeService {
  private url = 'https://receptai-49a60-default-rtdb.europe-west1.firebasedatabase.app/'

  constructor(
    private http: HttpClient,
    ) { }

  public addRecipe(recipe: Recipe) {
    return this.http.post(`${this.url}recipes.json`, recipe)
  }

  public getRecipes() {
    return this.http.get<Record<string, Recipe>>(`${this.url}recipes.json`).pipe(
      map((res): Recipe[] => {
        if (res) {
          return Object.entries(res).map(([key, value]) => ({ ...value, id: key }))
        } else {
          return []
        }
      }
    ))
  } 
}
