import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

const loadFromLocalStorage = () => {
  const savedFavourites = localStorage.getItem('favourites');

  return savedFavourites ? JSON.parse(savedFavourites) : [];
};

const saveToLocalStorage = (favourites: Product[]) => {
  localStorage.setItem('favourites', JSON.stringify(favourites));
};

export const favouriteSlice = createSlice({
  name: 'favourite',
  initialState: loadFromLocalStorage() as Product[],
  reducers: {
    addToFavourite: (favourites: any, action: { payload: any; }) => {
      const updatedFavourites = [...favourites, action.payload];

      saveToLocalStorage(updatedFavourites);

      return updatedFavourites;
    },
    removeFromFavourite: (favourites: any[], action: { payload: { id: number; }; }) => {
      const updatedFavourites = favourites.filter(
        (item: Product) => item.id !== action.payload.id,
      );

      saveToLocalStorage(updatedFavourites);

      return updatedFavourites;
    },
  },
});
