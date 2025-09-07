// src/components/pages/FavouritesCart/favouritesContext.js
import { createContext, useContext } from 'react';

export const FavouritesContext = createContext();

export const useFavourites = () => useContext(FavouritesContext);
