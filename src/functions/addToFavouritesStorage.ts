import { Phone } from '../types/Phone';

export const addToFavouritesStorage = (
  product: Phone | null,
  setFavouritesStorage: React.Dispatch<React.SetStateAction<Phone[]>>,
  setIsAddedToFavourites: React.Dispatch<React.SetStateAction<boolean>>,
) => () => {
  const storage = JSON.parse(localStorage.getItem('favourites') || '[]');

  storage.push(product);

  setIsAddedToFavourites(true);

  localStorage.setItem('favourites', JSON.stringify(storage));

  setFavouritesStorage(storage);
};
