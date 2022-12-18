export class Recipe {
  public id: string | null = null

  constructor(
    public name: string,
    public cookingTime: number,
    public description: string,
    public picture: string,
    public calories: number,
    public allergens?: string[],
    public ingredients?: { name: string, ammount: number, units: string }[]
  ) {}
}