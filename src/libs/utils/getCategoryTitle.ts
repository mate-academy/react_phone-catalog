import { CategoryName } from '../types/categoryName.enum';

export const getCategoryTitle = (string: string) => (
  string === CategoryName.Phones
    ? `Mobile ${string}`
    : string[0].toUpperCase() + string.slice(1)
);
