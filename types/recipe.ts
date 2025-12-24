export type Recipe = {
  title: string;
  category?: string;
  prepTime?: string;
  calories?: string;
  ingredients?: string[];
  instructions?: string;
};

export type AnalyzeResponse = {
  recipes: Recipe[];
};
