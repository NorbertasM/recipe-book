import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewRecipeService } from 'src/app/services/new-recipe.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  public recipeForm: FormGroup
  public static alergenai = ['Mėsa', 'Kiaušiniai', 'Riešutai', 'Pieno produktai', 'Glutenas']
  public static units = ['Vnt', 'Kg', 'g', 'mg', 'ml', 'l', 'stiklinė']
  public selectedAllergens: string[] = []

  constructor(
    private recipeService: NewRecipeService,
    private router: Router,
    ) {
    this.recipeForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      'cookingTime': new FormControl(null, [Validators.required, this.validateCookingTime]),
      'description': new FormControl(null, [Validators.required]),
      'picture': new FormControl(null, [Validators.required, this.validateUrl]),
      // 'picture': new FormControl(null, [Validators.pattern(new RegExp('/^(ftp|http|https):\/\/[^ "]+$/'))]),
      'calories': new FormControl(),
      'allergens': new FormArray([]),
      'ingredients': new FormArray([])
    })
   }

  ngOnInit(): void {
  }

  onSubmit() {
    this.recipeService.addRecipe(this.recipeForm.value).subscribe(() => this.router.navigate(['/']))
  }

  onSelect(val: string, index: number) {
    this.selectedAllergens.splice(index, 0, val)
  }

  validateCookingTime(control: FormControl): Record<string, boolean> | null {
    if (control.value > 0 && control.value % 5 !== 0) {
      return { 'Gaminimo laikas turi būti įvestas 5 intervale': true }
    } else {
      return null
    }
  }

  isAddAllergensDisabled() {
    return AddRecipeComponent.alergenai.length === (<FormArray>this.recipeForm.get('allergens'))?.length
  }

  validateUrl(control: FormControl): Record<string, boolean> | null {
    if (control.value  && !/^(ftp|http|https):\/\/[^ "]+$/.test(control.value)) {
      return { 'Nuotraukos URL neatitinka formato': true }
    } else {
      return null
    }
  }

  addAllergen() {
    const allergen = new FormControl(null, [Validators.required]);

    (<FormArray>this.recipeForm.get('allergens')).push(allergen)
  }
  
  removeAllergen(index: number) {
    this.selectedAllergens.splice(index, 1);

    (<FormArray>this.recipeForm.get('allergens')).removeAt(index)
  }
  
  addIngredient() {    
    const ingredient = new FormGroup({
      name: new FormControl(null, Validators.required),
      ammount: new FormControl(null, Validators.required),
      units: new FormControl(null, Validators.required),
    });
  
    (<FormArray>this.recipeForm.get('ingredients')).push(ingredient)
  }

  removeIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  allergens() {
    return (<FormArray> this.recipeForm.get('allergens')).controls
  }
  
  getAllergensOptions(index: number) {
    const newOptions = AddRecipeComponent.alergenai.filter(item =>
      !this.selectedAllergens.includes(item) || this.selectedAllergens[index] === item
    )
    return newOptions
  }

  getUnitsOptions() {
    return AddRecipeComponent.units
  }

  ingredients() {
    return (<FormArray> this.recipeForm.get('ingredients')).controls
  }

  abstractToFormGroup(address: AbstractControl<any,any>) {
    return address as FormGroup
  }
}
