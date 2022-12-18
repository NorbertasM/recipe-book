import { TestBed } from '@angular/core/testing';

import { NewRecipeService } from './new-recipe.service';

describe('NewRecipeService', () => {
  let service: NewRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
