// src/components/pages/FavouritesCart/favouritesContextHelpers
import { useContext } from 'react';
import { FavouritesContext } from './favouritesContext';

export const useFavourites = () => useContext(FavouritesContext);
