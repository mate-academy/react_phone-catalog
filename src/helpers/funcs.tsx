import { Category } from '../types/Category';

export const getCategoryName = (name: string) => {
  return name === Category.Phones
    ? `Mobile ${name}`
    : name[0].toUpperCase() + name.slice(1);
};
