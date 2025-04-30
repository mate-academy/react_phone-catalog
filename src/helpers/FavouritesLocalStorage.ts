import { IProductCard } from "../interfaces/ProductCard.interface";

export const saveFavouritesToLocalStorage = (items: IProductCard[]) => {
  localStorage.setItem('favourites', JSON.stringify(items));
};

export const loadFavouritesFromLocalStorage = () => {
  const items = localStorage.getItem('favourites');

  return {
    items: items ? JSON.parse(items) : [],
  };
};
