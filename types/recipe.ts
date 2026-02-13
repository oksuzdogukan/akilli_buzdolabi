export type Recipe = {
  id: number;
  title: string;
  category: string;
  description: string;
  prepTime: string;
  calories: string;
  ingredients: string[];
  instructions: string[];
};

export type AnalyzeResponse = {
  detectedIngredients: string[];
  recipes: Recipe[];
};
