import { MenuItems } from '../types/MenuItems';

export const getCategoryName = (name: string) => {
  return name === MenuItems.Phones
    ? `Mobile ${name}`
    : name[0].toUpperCase() + name.slice(1);
};
